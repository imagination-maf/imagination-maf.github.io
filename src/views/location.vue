<script>
    import Vue from 'vue';
    import WorldImage from '../images/maps/world.svg';
    import RegionImage from '../images/maps/region.svg';
    import City1Image from '../images/maps/city1.svg';
    import City2Image from '../images/maps/city2.svg';
    import City3Image from '../images/maps/city3.svg';

    export default Vue.component('location', {
        components: {
            WorldImage,
            RegionImage,
            City1Image,
            City2Image,
            City3Image
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
                styles: {}
            }
        },
        computed : {
            selectedView : function () {
                return this.$route.query.view;
            },
            mapStyles: function () {
                let styleList = {};
                Object.keys(this.styles).forEach( (key, index) => {
                    styleList[key] = this.styles[key][this.selectedView] ? this.styles[key][this.selectedView] : {};
                });
                return styleList;
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
                numLoaded++;
                // If loaded all SVGS
                if(numToLoad === numLoaded){
                    for(var index = 0; index < mapElements.length; index++) {
                        // Get the name of the svg image;
                        let name = mapElements[index].id;

                        // Get all the transformation states possible for this map element
                        let styles = {};

                        /** GETS THE POSITION WHERE IT SHOULD BE IN THE PARENT SVG **/
                        // Gets the map elements parent SVG;
                        let parentSVG = this.findParentSVG(name.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.zoom);

                        // If it has a parent, finds the position it should be when parent active;
                        let positionInParent = (parentSVG !== '') ? this.getPlacement(name.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.zoom, parentSVG) : null;

                        // Set the CSS style when map elements parent is active
                        if(positionInParent) {
                            styles[parentSVG] = {
                                'transform': `translate( ${ -positionInParent.translateX }px, ${ -positionInParent.translateY }px ) scale3d( ${ 1 / positionInParent.scale }, ${ 1 / positionInParent.scale }, 1)`
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
                                    'transform': `translate( ${ positionInImage.translateX * positionInImage.scale }px, ${ positionInImage.translateY * positionInImage.scale }px ) scale3d( ${ positionInImage.scale }, ${ positionInImage.scale }, 1)`
                                };
                            }
                        });

                        // Vue call to bind the new styles to the data object
                        Vue.set(this.styles, name, styles);
                    }
                }
            }

            // Loops through the container's children
            mapElements.forEach( (child) => {
                // Checks if the child is an svg
                if(child instanceof SVGElement) {
                    // Increments the number of loads to wait for
                    numToLoad++;
                    // Adds a listener for the loader
                    child.addEventListener('load', function($event) {
                        child.removeEventListener('load', function(){});
                        loadedSVGImage();
                    })
                }
            });
        }
    });
</script>

<template>
<div class="container">
    <!-- <div class="panel" v-show="levelName === 'world' || levelName === 'region'"> -->
    <div class="panel">
        <h2 class="panel-title">GROUP FOOTPRINT</h2>
        <h3 class="panel-subtitle">UNITED ARAB EMIRATES</h3>
        <ul class="menu panel-text">
            <li class="menu-item">Communities</li>
            <li class="menu-item">Consumer Finance</li>
            <li class="menu-item">Energy &amp; Facilities Management</li>
            <li class="menu-item">Fashion</li>
            <li class="menu-item">Hypermarkets &amp; Supermarkets</li>
            <li class="menu-item">Healthcare</li>
            <li class="menu-item">Hotels</li>
            <li class="menu-item">Restaurants &amp; Cafes</li>
            <li class="menu-item">Shopping Malls</li>
            <li class="menu-item">Speciality Retail Stores</li>
            <li class="menu-item">Unique Leisure Destinations</li>
        </ul>
    </div>
    <div id="map-container" class="map" @click="mapClick($event)">
        <WorldImage
            class="image"
            :class="{ 'active': selectedView === 'app_x5F_world--parent' }"
            :style="[mapStyles['app_x5F_world--parent']]" />
        <RegionImage
            class="image"
            :class="{ 'active': selectedView === 'app_x5F_region--parent' }"
            :style="[mapStyles['app_x5F_region--parent']]" />
        <City1Image
            class="image"
            :class="{ 'active': selectedView === 'app_x5F_city1--parent' }"
            :style="[mapStyles['app_x5F_city1--parent']]" />
        <City2Image
            class="image"
            :class="{ 'active': selectedView === 'app_x5F_city2--parent' }"
            :style="[mapStyles['app_x5F_city2--parent']]" />
        <City3Image
            class="image"
            :class="{ 'active': selectedView === 'app_x5F_city3--parent' }"
            :style="[mapStyles['app_x5F_city3--parent']]" />
    </div>
    <!--<div class="controls" v-show="levelName !== 'world' && levelName !== 'region'">-->
    <div class="controls">
        <button class="button" type="button" @click="zoomOut()">Zoom Out</button>
        <button class="button" type="button" @click="zoomIn()">Zoom In</button>
    </div>
</div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
}

.panel {
    left: 0;
    top: 0;
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    background: linear-gradient(to right, rgba(255, 255, 255, 1) 75%, rgba(255, 255, 255, 0) 100%);
    padding-left: 2rem;
    z-index: 1;
    .panel-title {
        padding-top: 3rem;
        color: #676767;
    }
    .panel-subtitle {
        color: #8a0836;
    }
    .panel-text {
        color: #777777;
    }
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
    background-color: #cccccc;
}

.image {
    position: absolute;
    left: 0;
    top: 0;
    overflow: visible !important;
    opacity: 0;
    pointer-events: none;
    transition: transform 1.5s ease-out, opacity 0.25s;
    &.active {
        opacity: 1;
        pointer-events: auto;
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
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .button {
        font-size: 1.5rem;
        margin: 0 1rem;
    }
}
</style>
