MAF Portfolio Vue
=================

This is a Vue.js project to display details of the properties provided by Majil Al Futtaim.

@TODO: Update with what the project is actually about.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm install
npm run build
```

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

### Docker image

The Docker image created as part of the auto-build (or manually with `make build`) contains an Nginx web server configured to serve the HTML files in the root directory, plus the `dist` directory created as part of `npm run build` on port 80.
