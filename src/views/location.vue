<script>
    import Vue from 'vue';
    import WorldImage from '../images/maps/World.svg';
    import UAERegionImage from '../images/maps/UAE-region.svg';
    import SharjahCityImage from '../images/maps/Sharjah-city.svg';
    import SharjahRoadImage from '../images/maps/Sharjah-road.svg';
    import MarkerInfo from '../components/markerInfo.vue';

    export default Vue.component('location', {
        components: {
            WorldImage,
            UAERegionImage,
            SharjahCityImage,
            SharjahRoadImage,
            MarkerInfo
        },
        data() {
            return {
                definitions : {
                    'separator': '_',
                    'modifier': '--',
                    'button': 'button',
                    'zoom': 'zoom',
                    'parent': 'parent',
                    'image': 'image'
                },
                styles: {},
                sizeModifiers: {},
                hideMarkers: false,
                pngImages: []
            }
        },
        computed : {
            selectedView : function () {
                return this.$route.query.view;
            },
            mapStyles: function () {
                // Gets the list of styles available
                let styleList = {};
                Object.keys(this.styles).forEach( (key, index) => {
                    styleList[key] = this.styles[key][this.selectedView] ? this.styles[key][this.selectedView] : '';
                });
                return styleList;
            },
            optionsAvailable: function () {
                let currentMapElement = document.getElementById(this.selectedView);
                if(currentMapElement) {
                    let children = Array.from(currentMapElement.children);
                    // Loop through each child (we know zoom ids will be the first level)
                    return children.filter( (child) => {
                        // Check is the child's id matches '--zoom'
                        return child.id.match(this.definitions.modifier + this.definitions.zoom);
                    }).length;
                } else {
                    return null;
                }
            }
        },
        methods: {
            applyStylesToImages: function () {
                let imageName = this.selectedView.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.image;

                let imagesElements = Array.from(document.getElementById('map-container').children).filter( (child) => child.tagName == 'IMG');

                imagesElements.forEach( (image) => {
                    let svgLink = image.id.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.parent;

                    if(imageName === image.id) {
                        image.classList.add('active');
                    } else {
                        image.classList.remove('active');
                    }

                    image.style.transform = this.mapStyles[svgLink];
                })
            },
            zoomOut: function () {
                // Converts --parent to --zoom
                let zoomElement = this.selectedView.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.zoom;
                // Searches for the parent where --zoom is present
                let newViewElement = this.findParentSVG(zoomElement);
                // If parent exists set that as active view
                if(newViewElement) {
                    this.$router.push({ query: { 'view': newViewElement }});
                }
            },
            zoomIn: function () {
                let currentMapElement = document.getElementById(this.selectedView);
                let children = Array.from(currentMapElement.children);
                // Loop through each child (we know zoom ids will be the first level)
                children.forEach( (child) => {
                    // Check is the child's id matches '--zoom'
                    if(child.id.match(this.definitions.modifier + this.definitions.zoom)){
                        // Convert --zoom to --parent
                        let newViewElement = child.id.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.parent;
                        // Set the new view element to the active view
                        this.$router.push({ query: { 'view': newViewElement }});
                        return;
                    }
                });
            },
            viewMasterplan: function () {
                this.$router.push({ path: 'community' });
            },
            mapClick: function($event) {
                // The path of elements clicked starting from lowest point first
                let pathElements = $event.path.reverse();
                // Loop through the elements
                for(var i = 0; i < pathElements.length; i++) {
                    // If the beginning of the id is 'app_' we know its one we're looking for
                    if(pathElements[i].id && pathElements[i].id.split(this.definitions.separator)[0] === 'app') {
                        // Split the id by the modifier '--'
                        let splitId = pathElements[i].id.split(this.definitions.modifier);
                        // Checks if the thing clicked was a button
                        if(splitId[splitId.length - 1].match(this.definitions.button)){
                            // Takes the namespace and add '--parent'
                            let newViewElement = splitId[0] + this.definitions.modifier + this.definitions.parent;
                            // Sets the new view to the newViewElement
                            this.$router.push({ query: { 'view': newViewElement } });
                            break;
                        }
                    }
                }
            },
            findSVGPosition: function(element){
                let rotate = element.transform.baseVal[0] ? element.transform.baseVal[0].angle : 0;
                return {
                    'x': element.x.baseVal.value,
                    'y': element.y.baseVal.value,
                    'width': element.width.baseVal.value,
                    'height': element.height.baseVal.value,
                    'rotate': rotate
                }
            },
            getPlacement: function(viewToFind, parent) {
                let parentElement = document.getElementById(parent);
                let childElement = document.getElementById(viewToFind);
                // finds the coordinates of the child element in its parent
                let locationCoords = this.findSVGPosition(childElement);

                // Gets the size of the child compared to parent
                // let scale = parentElement.width.baseVal.value / (locationCoords.max.x - locationCoords.min.x);
                // Finds the X distance of the child element from the center of the parent
                // let translateX = (parentElement.width.baseVal.value / 2) - ((locationCoords.min.x + locationCoords.max.x) / 2);
                // Finds the Y distance of the child element from the center of the parent
                // let translateY = (parentElement.height.baseVal.value / 2) - ((locationCoords.min.y + locationCoords.max.y) / 2);

                let scale = parentElement.width.baseVal.value / locationCoords.width;
                let translateX = (parentElement.width.baseVal.value / 2) - (locationCoords.width / 2);
                let translateY = (parentElement.height.baseVal.value / 2) - (locationCoords.height / 2);

                console.log('scale', scale, 'translateX', translateX, 'translateY', translateY);

                return {
                    translateX: translateX,
                    translateY: translateY,
                    scale: scale,
                    rotate: locationCoords.rotate
                }
            },
            findParentSVG: function(id) {
                let ele = document.getElementById(id);
                let parent = null;
                // Loops until a parent is found
                while(parent === null){
                    // Check the element exists and that it has a parent
                    if(ele && ele.parentElement){
                        // If the parent has '--parent' we have found the parent SVG
                        if(ele.parentElement.id.match(this.definitions.modifier + this.definitions.parent)) {
                            // Assign parent the id
                            parent = ele.parentElement.id;
                        } else {
                            // The parent is assigned as the element, tries process again
                            ele = ele.parentElement;
                        }
                    } else {
                        // No parent found so return nothing
                        parent = '';
                    }
                }
                return parent;
            }
        },
        mounted(){
            let container = document.getElementById('map-container');
            let mapElements = Array.from(container.children).filter((child) => child instanceof SVGElement);
            let convertions = [];

            let convertToPNGImage = (svg) => {
                return new Promise((resolve, reject) => {
                    // changeUIStatus(svg, false);

                    let markers = svg.querySelectorAll('g[id$=--marker], g[id$=--button], g[id=Map_labels], rect[id$=--zoom]');
                    for(let l = 0; l < markers.length; l++) {
                        markers[l].style.display = 'none';
                    }

                    // Create an svg image that can be applied to a canvas
                    let wrapper = document.createElement('div');
                    wrapper.appendChild(svg.cloneNode(true));
                    let data = "data:image/svg+xml;base64," + window.btoa(wrapper.innerHTML.replace(/[\u00A0-\u2666]/g, (c) => '&#' + c.charCodeAt(0) + ';'));
                    let newSVGImage = new Image();
                    newSVGImage.src = data;

                    for(let l = 0; l < markers.length; l++) {
                        markers[l].style.display = 'block';
                    }

                    newSVGImage.onload = () => {
                        let canvas = document.createElement('canvas');
                        let context = canvas.getContext('2d');
                        canvas.width = window.innerWidth * 5;
                        canvas.height = window.innerHeight * 5;
                        context.drawImage(newSVGImage, 0, 0, svg.width.baseVal.value, svg.height.baseVal.value, 0, 0, canvas.width, canvas.height);

                        let PNGImage = new Image();
                        PNGImage.src = canvas.toDataURL('image/png');
                        PNGImage.classList.add('png-image');
                        PNGImage.id = svg.id.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.image;

                        let container = document.getElementById('map-container');
                        container.appendChild(PNGImage);

                        // Hide the visual data
                        svg.querySelector('g[id=map-data]').style.display = 'none';

                        resolve();
                    }

                    newSVGImage.onerror = () => {
                        reject();
                    }
                });
            }

            let loadedSVGImage = () => {
                // Increment the number of SVGs loaded
                for(var index = 0; index < mapElements.length; index++) {
                    // The SVG Name image;
                    let name = mapElements[index].id;

                    // Get all the transformation states possible for this map element
                    let styles = {};
                    styles[name] = 'translate(0px, 0px) scale(1)';

                    // Adds class to each zoom container
                    let zoomElements = mapElements[index].querySelectorAll('rect[id$=--zoom]');
                    for(let k = 0; k < zoomElements.length; k++) {
                        zoomElements[k].classList.add('container');
                    }

                    /** GETS THE POSITION WHERE IT SHOULD BE IN THE PARENT SVG **/
                    // Gets the map elements parent SVG;
                    let parentSVG = this.findParentSVG(name.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.zoom);

                    // If it has a parent, finds the position it should be when parent active;
                    let positionInParent = (parentSVG !== '') ? this.getPlacement(name.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.zoom, parentSVG) : null;

                    // Set the CSS style when map elements parent is active
                    if(positionInParent) {
                        styles[parentSVG] = `translate( ${ -positionInParent.translateX }px, ${ -positionInParent.translateY }px ) scale( ${ 1 / positionInParent.scale }, ${ 1 / positionInParent.scale })`;
                    }

                    /** GETS THE CHILDREN IN THE MAP ELEMENT **/
                    // So can zoom into each of these
                    let childSVGContainer = Array.from(mapElements[index].children);
                    // Loop through each child (we know zoom ids will be the first level)
                    childSVGContainer.forEach( (child) => {
                        // Check is the child's id matches '--zoom'
                        if(child.id.match(this.definitions.modifier + this.definitions.zoom)){
                            // Converts the --zoom to be --parent to refer to another map element
                            let childParent = child.id.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.parent;
                            // Gets the position of the child in the current map element
                            let positionInImage = this.getPlacement(child.id, name);

                            // Sets the CSS transform when the child id is active
                            styles[childParent] = `translate( ${ 0 }px, ${ positionInImage.translateY * positionInImage.scale }px ) scale( ${ positionInImage.scale }, ${ positionInImage.scale })`;
                        }
                    });

                    // Vue call to bind the new styles to the data object
                    Vue.set(this.styles, name, styles);
                }

                for(let loadIndex = 0; loadIndex < mapElements.length; loadIndex++) {
                    convertions.push(convertToPNGImage(mapElements[loadIndex]));
                }

                Promise.all(convertions).then( () => {
                    this.applyStylesToImages();
                });
            }

            loadedSVGImage();
        },
        watch: {
            mapStyles: function (val) {
                this.applyStylesToImages();
            }
        }
    });
</script>

<template>
<div class="container">
    <!-- TODO Add condition here to check if markers are available -->
    <MarkerInfo></MarkerInfo>
    <div id="map-container" class="map" :class="{'marker-status': hideMarkers}" @click="mapClick($event)">
        <transition name="map-switch">
            <WorldImage
                class="image"
                v-show="selectedView === 'app_x5F_world--parent'" />
                <!-- :class="{ 'active': selectedView === 'app_x5F_world--parent' }" /> -->
                <!-- :style="[mapStyles['app_x5F_world--parent']]" /> -->
        </transition>
        <transition name="map-switch">
            <UAERegionImage
                class="image"
                v-show="selectedView === 'app_x5F_UAE--parent'" />
                <!-- :class="{ 'active': selectedView === 'app_x5F_UAE--parent' }" /> -->
                <!-- :style="[mapStyles['app_x5F_UAE--parent']]" /> -->
        </transition>
        <transition name="map-switch">
            <SharjahCityImage
                class="image"
                v-show="selectedView === 'app_x5F_Sharjah--parent'" />
                <!-- :class="{ 'active': selectedView === 'app_x5F_Sharjah--parent' }" /> -->
                <!-- :style="[mapStyles['app_x5F_Sharjah--parent']]" /> -->
        </transition>
        <transition name="map-switch">
            <SharjahRoadImage
                class="image"
                v-show="selectedView === 'app_x5F_Sharjah-road--parent'" />
                <!-- :class="{ 'active': selectedView === 'app_x5F_Sharjah-road--parent' }" /> -->
                <!-- :style="[mapStyles['app_x5F_Sharjah-road--parent']]" /> -->
        </transition>
    </div>

    <!-- <div class="controls" v-show="optionsAvailable === 1 || optionsAvailable === 0"> -->
    <div class="controls">
        <div class="controls-row">
            <button class="button zoom" type="button" @click="zoomOut()">Zoom Out</button>
            <button class="button zoom" :class="{ 'disabled': optionsAvailable === 0 }" type="button" @click="zoomIn()">Zoom In</button>
        </div>
        <div class="controls-row">
            <button class="button masterplan" type="button" @click="viewMasterplan()">View Masterplan</button>
        </div>
    </div>
</div>
</template>

<style lang="scss">
.marker-status {
    .marker {
        // transition: visibility 5s ease;
        // visibility: hidden !important;
        display: none !important;
        // opacity: 0;
    }
}

.marker {
    // transition: opacity 0.25s ease 0.1s;
}

.zoom-container {
    visibility: hidden !important;
}

.png-image {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    transition: transform 1s ease-out 1s, opacity 0.25s ease-out 2s;
    &.active {
        opacity: 1;
        transition: transform 1s ease-out 1s, opacity 0.25s ease-out 0s;
    }
}
</style>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
}

.map {
    width: 100%;
    height: 100%;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #ffffff;
}

.image {
    position: absolute;
    left: 0;
    top: 0;
    overflow: visible !important;
    will-change: opacity;
}

svg:not(:root) {
    overflow: visible !important;
}

.menu {
    display: flex;
    flex-direction: column;
}

.controls {
    position: absolute;
    bottom: 1rem;
    left: 42.5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    .controls-row {
        display: flex;
        width: 100%;
        margin: 0.25rem 0;
        .button {
            font-size: 1.5rem;
            margin: 0;
            flex: 1;
            padding: 0.5rem 0;
            outline: none;
            &.zoom {
                background-color: #881839;
                color: #fdfdfb;
                &:first-child {
                    margin-right: 0.5rem;
                }
                &:last-child {
                    margin-left: 0.5rem;
                }
                &.disabled {
                    opacity: 0.25;
                    pointer-events: none;
                }
            }
            &.masterplan {
                background-color: #b3965e;
                color: #fdfdfb;
            }
        }
    }
}
</style>
