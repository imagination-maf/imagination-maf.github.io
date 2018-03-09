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
                    'parent': 'parent'
                },
                styles: {},
                hideMarkers: false
            }
        },
        computed : {
            selectedView : function () {
                return this.$route.query.view;
            },
            mapStyles: function () {
                let styleList = {};
                Object.keys(this.styles).forEach( (key, index) => {
                    styleList[key] = this.styles[key][this.selectedView] ? this.styles[key][this.selectedView] : {'display': 'none'};
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
                this.hideMarkers = true;
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
                this.hideMarkers = true;
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
                this.hideMarkers = true;
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
                // Sets the initial coordinates to null
                let coor = {
                    min: {'x': null, 'y': null},
                    max: {'x': null, 'y': null}
                }

                // Loops through the svg line to get the minimum and maximum points for x and y
                for(var i = 0; i < Math.ceil(element.getTotalLength()); i++) {
                    let point = element.getPointAtLength(i)
                    coor.min.x = coor.min.x === null || point.x < coor.min.x ? point.x : coor.min.x;
                    coor.max.x = coor.max.x === null || point.x > coor.max.x ? point.x : coor.max.x;
                    coor.min.y = coor.min.y === null || point.y < coor.min.y ? point.y : coor.min.y;
                    coor.max.y = coor.max.y === null || point.y > coor.max.y ? point.y : coor.max.y;
                }

                return coor;
            },
            getPlacement: function(viewToFind, parent) {
                let parentElement = document.getElementById(parent);
                let childElement = document.getElementById(viewToFind);
                // finds the coordinates of the child element in its parent
                let locationCoords = this.findSVGPosition(childElement);

                // Gets the size of the child compared to parent
                let scale = parentElement.width.baseVal.value / (locationCoords.max.x - locationCoords.min.x);
                // Finds the X distance of the child element from the center of the parent
                let translateX = (parentElement.width.baseVal.value / 2) - ((locationCoords.min.x + locationCoords.max.x) / 2);
                // Finds the Y distance of the child element from the center of the parent
                let translateY = (parentElement.height.baseVal.value / 2) - ((locationCoords.min.y + locationCoords.max.y) / 2);

                return {
                    translateX: translateX,
                    translateY: translateY,
                    scale: scale
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
            let mapElements = Array.from(container.children);
            let numToLoad = 0;
            let numLoaded = 0;

            let loadedSVGImage = () => {
                // Increment the number of SVGs loaded
                for(var index = 0; index < mapElements.length; index++) {
                    let markerElements = mapElements[index].querySelectorAll('g[id$=--marker], g[id$=--button], g[id=Map_labels]');
                    for(let j = 0; j < markerElements.length; j++) {
                        markerElements[j].classList.add('marker');
                    }

                    let zoomElements = mapElements[index].querySelectorAll('rect[id$=--zoom]');
                    for(let k = 0; k < zoomElements.length; k++) {
                        zoomElements[k].classList.add('zoom-container');
                    }

                    // Get the name of the svg image;
                    let name = mapElements[index].id;

                    // Get all the transformation states possible for this map element
                    let styles = {};

                    styles[name] = {};

                    /** GETS THE POSITION WHERE IT SHOULD BE IN THE PARENT SVG **/
                    // Gets the map elements parent SVG;
                    let parentSVG = this.findParentSVG(name.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.zoom);

                    // If it has a parent, finds the position it should be when parent active;
                    let positionInParent = (parentSVG !== '') ? this.getPlacement(name.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.zoom, parentSVG) : null;

                    // Set the CSS style when map elements parent is active
                    if(positionInParent) {
                        styles[parentSVG] = {
                            'transform': `translate3d( ${ -positionInParent.translateX }px, ${ -positionInParent.translateY }px, 0 ) scale3d( ${ 1 / positionInParent.scale }, ${ 1 / positionInParent.scale }, 1)`
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
                            styles[childParent] = {
                                'transform': `translate3d( ${ positionInImage.translateX * positionInImage.scale }px, ${ positionInImage.translateY * positionInImage.scale }px, 0 ) scale3d( ${ positionInImage.scale }, ${ positionInImage.scale }, 1)`
                            };
                        }
                    });

                    // Vue call to bind the new styles to the data object
                    Vue.set(this.styles, name, styles);
                }
            }

            loadedSVGImage();
        },
        watch: {
            hideMarkers: function (val) {
                if(val) {
                    this.timer = window.setTimeout( () => {
                        this.hideMarkers = false;
                    }, 3000);
                }
            }
        }
    });
</script>

<template>
<div class="container">
    <MarkerInfo></MarkerInfo>
    <div id="map-container" class="map" :class="{'marker-status': hideMarkers}" @click="mapClick($event)">
        <WorldImage
            class="image"
            :class="{ 'active': selectedView === 'app_x5F_world--parent' }"
            :style="[mapStyles['app_x5F_world--parent']]" />
        <UAERegionImage
            class="image"
            :class="{ 'active': selectedView === 'app_x5F_UAE--parent' }"
            :style="[mapStyles['app_x5F_UAE--parent']]" />
        <SharjahCityImage
            class="image"
            :class="{ 'active': selectedView === 'app_x5F_Sharjah--parent' }"
            :style="[mapStyles['app_x5F_Sharjah--parent']]" />
        <SharjahRoadImage
            class="image"
            :class="{ 'active': selectedView === 'app_x5F_Sharjah-road--parent' }"
            :style="[mapStyles['app_x5F_Sharjah-road--parent']]" />
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
    opacity: 0;
    pointer-events: none;
    transition: transform 1s ease-out 0.5s, opacity 0s ease-out 2s;
    outline: 1px solid transparent;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    will-change: transform, opacity;
    &.active {
        opacity: 1;
        pointer-events: auto;
        transition: transform 1s ease-out 0.5s, opacity 0s ease-out 0s;
    }
    &.instant {
        // transition: transform 1.5s ease-out, opacity 0.25s ease-out 0s;
    }
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
