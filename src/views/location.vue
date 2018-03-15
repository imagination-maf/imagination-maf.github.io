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
                pngImages: {
                    'World': require('../images/maps/World.png'),
                    'UAERegion': require('../images/maps/UAE-region.png'),
                    'SharjahCity': require('../images/maps/Sharjah-city.png'),
                    'SharjahRoad': require('../images/maps/Sharjah-road.png')
                }
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

                let scale = parentElement.width.baseVal.value / locationCoords.width;
                let translateX = (parentElement.width.baseVal.value / 2) - (locationCoords.x + (locationCoords.width / 2) );
                let translateY = (parentElement.height.baseVal.value / 2) - (locationCoords.y + (locationCoords.height / 2) );

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

            let loadedSVGImage = () => {
                // Increment the number of SVGs loaded
                for(var index = 0; index < mapElements.length; index++) {
                    // The SVG Name image;
                    let name = mapElements[index].id;

                    // Get all the transformation states possible for this map element
                    let styles = {};
                    styles[name] = {transform: 'translate(0px, 0px) scale(1)'};

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
                        styles[parentSVG] = { transform:
                            `translate( ${ -positionInParent.translateX }px, ${ -positionInParent.translateY }px )
                            rotate( ${positionInParent.rotate}deg )
                            scale( ${ 1 / positionInParent.scale }, ${ 1 / positionInParent.scale } )`
                        };
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
                            styles[childParent] = { transform:
                                `translate( ${ positionInImage.translateX * positionInImage.scale }px, ${ positionInImage.translateY * positionInImage.scale }px )
                                rotate( ${ positionInImage.rotate }deg )
                                scale( ${ positionInImage.scale }, ${ positionInImage.scale } )`};
                        }
                    });

                    // Vue call to bind the new styles to the data object
                    Vue.set(this.styles, name, styles);
                }
            }

            loadedSVGImage();
        }
    });
</script>

<template>
<div class="container">
    <!-- TODO Add condition here to check if markers are available -->
    <MarkerInfo></MarkerInfo>
    <div id="map-container" class="map" :class="{'marker-status': hideMarkers}" @click="mapClick($event)">
        <!-- World -->
            <img
                id="app_x5F_world--image"
                class="png-image"
                :src="pngImages.World"
                :style="[mapStyles['app_x5F_world--parent']]"
                :class="{ 'active': selectedView === 'app_x5F_world--parent' }" />
            <transition name="map-switch">
                <WorldImage
                    class="image"
                    v-show="selectedView === 'app_x5F_world--parent'" />
            </transition>
        <!-- End of World -->
        <!-- UAE -->
            <img
                id="app_x5F_UAE--image"
                class="png-image"
                :src="pngImages.UAERegion"
                :style="[mapStyles['app_x5F_UAE--parent']]"
                :class="{ 'active': selectedView === 'app_x5F_UAE--parent' }" />
            <transition name="map-switch">
                <UAERegionImage
                    class="image"
                    v-show="selectedView === 'app_x5F_UAE--parent'" />
            </transition>
        <!-- End of UAE -->
        <!-- Sharjah City -->
            <img
                id="app_x5F_Sharjah--image"
                class="png-image"
                :src="pngImages.SharjahCity"
                :style="[mapStyles['app_x5F_Sharjah--parent']]"
                :class="{ 'active': selectedView === 'app_x5F_Sharjah--parent' }" />
            <transition name="map-switch">
                <SharjahCityImage
                    class="image"
                    v-show="selectedView === 'app_x5F_Sharjah--parent'" />
            </transition>
        <!-- End of Sharjah City -->
        <!-- Sharjah Road -->
            <img
                id="app_x5F_Sharjah-road--image"
                class="png-image"
                :src="pngImages.SharjahRoad"
                :style="[mapStyles['app_x5F_Sharjah-road--parent']]"
                :class="{ 'active': selectedView === 'app_x5F_Sharjah-road--parent' }" />
            <transition name="map-switch">
                <SharjahRoadImage
                    class="image"
                    v-show="selectedView === 'app_x5F_Sharjah-road--parent'" />
            </transition>
        <!-- End of Sharjah Road -->
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
    transition: transform 0.5s ease-out 0.25s, opacity 0.25s ease-out 0.75s;
    &.active {
        opacity: 1;
        transition: transform 0.5s ease-out 0.25s, opacity 0.25s ease-out 0s;
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
