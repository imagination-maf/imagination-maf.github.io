MAF Portfolio Vue
=================

Communities Portfolio is a sales tool for Majil Al Futtaim to show properties available for purchase. The properties are split into 4 communities (Tilal Al Ghaf, Al Zahia, Al Mouj Muscat and Waterfront City).

Tools used:

Javascript: VueJS,

CSS: SASS

Task Runner: Webpack

The project also makes heavy use of SVGs


## Installing the project


To run the project locally on your machine you must have NodeJS installed on your machine. It can be downloaded [here](https://nodejs.org/en/).

Once downloaded clone the repo and run the following command

	npm install
	
This will install all the dependencies that the app needs to run. If you want to run the app in table mode you also need to clone the gallery images into the root of the directory. The repo for the gallery images can be found [here](https://bitbucket.org/imagination/maf-gallery-images).

	git clone git@bitbucket.org:imagination/maf-gallery-images.git gallery

## Running the project

To run the project, use the command:

	npm run dev
	
The command will automatically run the browser. Using this command, the gallery and floorplan images will be loaded from an Amazon S3 Bucket found [here](https://s3.console.aws.amazon.com/s3/buckets/maf-gallery-images/?region=us-east-2&tab=overview).

To run the app using images on the device (table configuration) use the command
	
	npm run dev:table

## App Structure

The app is split into multiple folders. The logic controlling routes in the app can be found in the views folder, with components found inside of the views found in the components folder and data holds config value and hardcoded data that the app uses. CSS for each route is included within the VueJS file.

### Attractor: [File](https://bitbucket.org/imagination/maf-portfolio-vue/src/b98931ffb03a918a00783bf5f46336272a2e1076/src/views/attractor.vue?at=master&fileviewer=file-view-default)

The app starts on the attractor screen and will reset to this route when there has been inactivity for 3 minutes. It uses a timer of 5 seconds to loop between 3 screens (a logo, a call to action button and a community selection menu). Pressing either of the first 2 screens will go to /community-selection. Pressing the MAF logo in the top right will take you to the world view on the Location route.

### Community Selection: [File](https://bitbucket.org/imagination/maf-portfolio-vue/src/b98931ffb03a918a00783bf5f46336272a2e1076/src/views/communitySelection.vue?at=master&fileviewer=file-view-default)

The community selection page contains the [LocationMenu](https://bitbucket.org/imagination/maf-portfolio-vue/src/b98931ffb03a918a00783bf5f46336272a2e1076/src/components/locationMenu.vue?at=master&fileviewer=file-view-default) component, which is also used on the attractor screen. This component shows the 4 available communities, looping through 5 images for each one. The images can be found [here](https://bitbucket.org/imagination/maf-portfolio-vue/src/b98931ffb03a918a00783bf5f46336272a2e1076/src/images/attractor/?at=master). 

An interval is setup to trigger ever 2.5 seconds. The variable slideshowStatus.status controls which images are changed, when odd the 1st and 3rd images change, when even the 2nd and 4th change. slideshowStatus.odd and slideshowStatus.even control which of the 5 images are shown. Once the counter reaches 5 it will revert back to the first image again.

Pressing one of the communities takes you the location screen (map view) with a query string set to the community pressed.

### Location (Map View): [File](https://bitbucket.org/imagination/maf-portfolio-vue/src/b98931ffb03a918a00783bf5f46336272a2e1076/src/views/location.vue?at=master&fileviewer=file-view-default)

The location page is a map, zooming from a world view down to a road view for each of the 4 communities.

This page makes heavy use of PNG and SVG images. For each view, there is a PNG image that contains all the visual data of the map and is located at the bottom of the layers. An SVG image sits on top of this which contains the items which can be interacted with by the user.

The Table and iPad use different images. The table images have a resoultion of 3840px x 2160px, found [here](https://bitbucket.org/imagination/maf-portfolio-vue/src/b98931ffb03a918a00783bf5f46336272a2e1076/src/images/maps/?at=master). The iPad images have a resolution of 1024px x 576px.

#### SVG Image requirements

The app requires a number of parameters from the SVG to work. Using IDS each of the SVGS are joined together so that the app can zoom in and out between the different PNG and SVG images. Each of the IDs has `app_` at the front to indicate that the app should use this value. The following IDs are used to control the zooming in and out from world view to masterplan view.

- The SVG should have its ID in the root, along with the parent modifier, for example `app_VIEWID--parent`. The world view has a ID in illustrator as `app_world--parent`, in the app this comes out as `app_x5F_world--parent`.
- For an view to zoom in to another view it needs to have an ID with the zoom modifier, for example `app_VIEWTOZOOMTO--zoom`. The element with the id attached should be a rectangle at 16:9 ratio and positioned so that when the images are changed the transition is seamless. For example, the world view zooms to the UAE view, in the world.svg, there is the following code:

	`<rect id="app_x5F_UAE--zoom" x="2306" y="946" style="fill:none;" width="346" height="194"/>`
	
- If there is only one `--zoom` element a navigation appears at the bottom to zoom in, zoom out or view masterplan. If there is more than one zoom the button modifier should be used. Like with the zoom this should look like the following, `app_VIEWTOZOOMTO--button`. When this button is pressed (or any of the elements inside the button group), it will look for the correlating zoom element use that to zoom in.

The SVG image and PNG image should be the same size as the zoom is calculated using the SVG but actually applied to the PNG image. The PNG image is used for the animation for performance issues, as the SVG image is very stuttery.

Another thing to note is that the SVG must have a view box with coordinates 0 0 for the calculation to work correctly, for example `viewBox="0 0 3840 2160"`.

With these things in place the zooming in and out will work correctly.

There are a few other IDs that are required by the app.

- The marker modifier is used to display the building in each country under the group footprint. This uses the same syntax as before `app_MARKERID--marker`. The marker ID found is then looked up in the [Marker Data file](https://bitbucket.org/imagination/maf-portfolio-vue/src/1f9e78345f0ffb87ca268f422ceba8d0aedd1728/src/data/markerData.js?at=master&fileviewer=file-view-default) to display the correct data in the group footprint. Each view has a default country that can be set, so when entering at region level from the community selection page, the correct country is automatically display. A dummy marker is set in the top left of each region level view to display the group footprint on the left hand side of the screen.
- The pulse modifier is used to highlight areas of the SVG that can be clicked. The app will look up these areas and add an HTML element that pulses. `app_PULSEID--pulse` 


### Overview Page
 
When the 'view masterplan' button is pressed in the location route, the ID of the view is matched to the community. These are listed in the [config file](https://bitbucket.org/imagination/maf-portfolio-vue/src/1f9e78345f0ffb87ca268f422ceba8d0aedd1728/src/data/config.js?at=master&fileviewer=file-view-default).

The PNG and SVG are loaded for the selected community. Like before the PNG displays the visual data and the SVG is used as the interactive layer for the user.

This route shows an overview of the community, showing all the different neighbourhoods. Each neighbourhood has a tap area. When the user clicks on this, the community route is loaded.

### Community Page

Onload of the page, the community is checked against the list of [sold out communities](https://bitbucket.org/imagination/maf-portfolio-vue/src/1f9e78345f0ffb87ca268f422ceba8d0aedd1728/src/data/soldOutCommunities.js?at=master&fileviewer=file-view-default). If the neighbourhood is on the list, an overlay is displayed showing information about it.

If not, the app talks to the backend and gets all the plot details for that area. From the properties, all the different types are tracked and used in a filter. 

For each community, there is an SVG containing all the plot boundaries. These IDs match the IDs from the API. Pressing an outline matches gets the data from the API and displays an overlay with information about the property. The overlay contains a mixture of API data and hardcoded values from the config (when the API data hasn't been provided).


## Deployment

Staging and live stacks are deployed [with Rancher](https://rancher-maf.0x07.co.uk/) to two EC2 boxes in the Mumbai region on AWS (ap-south-1). The PostgreSQL servers are hosted on RDS in the same region. See the [backend repository](https://bitbucket.org/imagination/maf-backend) readme for more details.

## Auto build and deploy

When the project is version-bumped (and therefore tagged) with `npm version major/minor/patch`, then pushed to the Bitbucket repository, a [Bitbucket Pipeline](https://bitbucket.org/imagination/maf-portfolio-vue/addon/pipelines/home#!/) will be triggered. This will run `make upload` to build a new version of the Docker image for this project. `make upload` may also be run locally and it will build a version based on the git branch/tag that's currently checked out.

Once a new image has been built, it will be uploaded to the Docker registry and a Bitbucket Deployment to staging will be triggered. The deployment will run the Python script in `deploy/deploy.py` on the `flyte/rancher-tools` [docker image](https://hub.docker.com/r/flyte/rancher-tools/) ([repo](https://github.com/flyte/rancher-tools)).

The `deploy/deploy.py` script will perform the following functions using the Rancher API:

- Get whichever stack is configured in the `bitbucket-pipelines.yml` file for this deployment (`maf-staging` for staging)
- Get the load balancer service
- Get whichever service the load balancer is currently serving on port 443 at path `/`
- Clones the frontend service attained in the previous step and sets the relevant labels on it
- Waits for the new service to start
- Waits for the new service to pass its health check
- Updates the load balancer to point to the new service instead of the old one
- Removes any old frontend services, except for the one we've just made and the one we just replaced. This is so that we can switch back to the old service by manually changing the load balancer back using the Rancher UI.

### Deploying to live

Once the above process has completed automatically on the staging stack, a live deployment can be triggered manually. In order to deploy a new version to live, go to the [Bitbucket Pipelines](https://bitbucket.org/imagination/maf-portfolio-vue/addon/pipelines/home#!/) page and select the build you want to deploy. If the build has completed and deployed to staging, then you will be presented with a 'Run' button on the 'Deploy to live' stage. Press the button to deploy to the live stack.

### Docker image

The Docker image created as part of the auto-build (or manually with `make build`) contains an Nginx web server configured to serve the HTML files in the root directory, plus the `dist` directory created as part of `npm run build` on port 80.


# Windows 10 Installation Guide

## Install prerequisites

Download and install the following...

* Git [https://git-scm.com/download/win](https://git-scm.com/download/win) (Accept All Defaults when installing)
* Node (and NPM) [https://nodejs.org/dist/v8.11.0/node-v8.11.0-x64.msi](https://nodejs.org/dist/v8.11.0/node-v8.11.0-x64.msi)
* Chrome [https://git-scm.com/download/win](https://git-scm.com/download/win)

## Add Machine to Bitbucket

Before you can use git, you need to create an ssh key and add to the relevant bitbukcet accounts...

In Windows File Explorer, right click on a folder and select ***"Git Bash Here"***

From the terminal window, enter the following commands...

```
ssh-keygen
cat ~/.ssh/id_rsa.pub > /dev/clipboard
```

The ssh public key should now be in the clipboard.

Log into Bitbucket and add the ssh key (in clipboard) to the following repos...

* [https://bitbucket.org/imagination/maf-portfolio-vue](https://bitbucket.org/imagination/maf-portfolio-vue)
* [https://bitbucket.org/imagination/maf-gallery-images](https://bitbucket.org/imagination/maf-gallery-images)
* [https://bitbucket.org/imagination/maf-websocket-node](https://bitbucket.org/imagination/maf-websocket-node)

## Clone Repositories

On the root of the C Drive, create a directory called ***Imagination***

(Still in the git bash terminal), clone the repositories...

```
 mkdir /C/Imagination
 cd /C/Imagination
 git clone git@bitbucket.org:imagination/maf-portfolio-vue.git
```

After cloning the main application repository, you also need to clone the image dependencies in the project...

```
cd /C/Imagination/maf-portfolio-vue
git clone git@bitbucket.org:imagination/maf-gallery-images.git gallery
```

(This should clone the repo into a sub directory called gallery)

## Building the Project

The application runs within 2 target environments...

* The 2x2 Touch Table (Windows 10)
* Web Based Version (Safari or Chrome)

### Building for the Touch Table

```
cd /C/Imagination/maf-portfolio-vue
npm i
npm run build:table
```

### Building for the Web

```
cd /C/Imagination/maf-portfolio-vue
npm i
npm run build
```

## Running with PM2

The node module PM2 is used to keep the application "alive".

Make sure PM2 is installed...

```
npm i -g pm2
```

We need to tell PM2 about our app so that it can monitor and restart it (if needed)...

```
cd /C/Imagination/maf-portfolio-vue
pm2 start ecosystem.config.js
pm2 save
```

At this stage the application should be running. You can confirm this by issuing the following command...

```
pm2 list
```

The app **CP_APP** should be showing as online

You should also be able to load the app in chrome...

[http://localhost:8888/#/iframed](http://localhost:8888/#/iframed)

Note, you can stop PM2 by issuing the following command...

```
pm2 kill
```

and then use the following to start it again...

```
pm2 resurrect
```

To restart the application, use the command...

```
pm2 restart CP_APP
```


## Running the App in Chrome

The application runs in full screen chrome using the kiosk mode.

To setup chrome, we first need to create a new profile...

1. Open Chrome
1. Select Manage people (from the profile icon in the title bar)
1. Select ADD PERSON
1. Enter kiosk as the person name
1. Click ADD

We need to update this kiosk profile's startup page to be the application...

1. Click on Settings from the options menu (3 dots in the top right)
1. In On startup, choose Open a specific page or set of pages
1. Click Add a new page
1. Enter http://localhost:8888/#/iframed
1. Click ADD

This will create a shortcut on the desktop for the kiosk profile.

To make the link run in full screen kiosk mode, right click the shortcut and choose Properties.

Edit the Target value and add in the following argument...

```
--kiosk
```

The final target should look something like this...

```
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --kiosk --profile-directory="Profile 1"
```

To ecit chrome when running in kiosk mode, hold down the alt+tab keys and click on the close button when the running apps windows show.

## Updates by freelancer: Pete Morton (pete.morton@bigbangcreative.co.uk); 04-08/06/2018

Uptown Al Zahia

Work was mainly focussed around adding the Uptown region in Al Zahia which had 2 districts Woroud and Zohour.
Data is hard-coded; referenced in ./src/data/uptown.js
No plot data was available; structure loosely followed that of tilal Al Ghaf

User journey:
1. Uptown was added as a clickable area to the alzahia svg: /overview?community=alzahia
2. Uptown is treated as a separate community rather than a neighbourhood of Alzahia  - this was the simplest way to allow a second clickable svg to be served: overview?community=uptown
   An exception was added to the backToMap function to reload /overview?community=alzahia when clicking back - ln 39 ./src/views/overvue.vue
3. Zohour and Woroud are then treated as neighbourhoods of Uptown and follow the same structure as tilal Al Ghaf
4. Data for both neighbourhoods is hard-coded; referenced in ./src/data/uptown.js
5. New route added to ./src/router.js
6. Most changes added to ./src/views/overvue.vue 
7. Gallery updated at git repo: https://bitbucket.org/imagination/maf-gallery-images

Waterfront City

Currency changes were required for the pricing.
1. Text change to show US as currency
2. Correct error in formatting where '.00' had been hard-coded to the end the price string. Some api data already had .xx or .x in the string.
   Fixed this by adding a US locale for all pricing (have assumed the format is the same for all areas here) and then requiring 2 decimal places
   'property.price.toLocaleString('en-US', { minimumFractionDigits: 2 })' - ln 107 ./src/components/propertyInfoSummary.vue

GIT Repos

Have tried to make git commit comments logical and commit in small chunks.
Separate branch was created to work from: Imagination  > MAF > maf-portfolio-vue > Branches > dev-jun-18 