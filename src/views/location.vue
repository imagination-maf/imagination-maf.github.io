<script>
    import Vue from 'vue';
    var VueTouch = require('vue-touch');
    Vue.use(VueTouch, {name: 'v-touch'});
    import WorldImage from '../images/maps/World.svg';
    import UAERegionImage from '../images/maps/UAE-region.svg';
    import OmanRegionImage from '../images/maps/Oman-region.svg';
    import LebanonRegionImage from '../images/maps/Lebanon-region.svg';
    import SharjahCityImage from '../images/maps/Sharjah-city.svg';
    import SharjahRoadImage from '../images/maps/Sharjah-road.svg';
    import DubaiCityImage from '../images/maps/Dubai-city.svg';
    import DubaiRoadImage from '../images/maps/Dubai-road.svg';
    import LebanonCityImage from '../images/maps/Lebanon-city.svg';
    import LebanonRoadImage from '../images/maps/Lebanon-road.svg';
    import MuscatCityImage from '../images/maps/Muscat-city.svg';
    import MuscatRoadImage from '../images/maps/Muscat-road.svg';
    import WorldIpadImage from '../images/maps-ipad/World-ipad.svg';
    import UAERegionIpadImage from '../images/maps-ipad/UAE-region-ipad.svg';
    import OmanRegionIpadImage from '../images/maps-ipad/Oman-region-ipad.svg';
    import LebanonRegionIpadImage from '../images/maps-ipad/Lebanon-region-ipad.svg';
    import SharjahCityIpadImage from '../images/maps-ipad/Sharjah-city-ipad.svg';
    import SharjahRoadIpadImage from '../images/maps-ipad/Sharjah-road-ipad.svg';
    import DubaiCityIpadImage from '../images/maps-ipad/Dubai-city-ipad.svg';
    import DubaiRoadIpadImage from '../images/maps-ipad/Dubai-road-ipad.svg';
    import LebanonCityIpadImage from '../images/maps-ipad/Lebanon-city-ipad.svg';
    import LebanonRoadIpadImage from '../images/maps-ipad/Lebanon-road-ipad.svg';
    import MuscatCityIpadImage from '../images/maps-ipad/Muscat-city-ipad.svg';
    import MuscatRoadIpadImage from '../images/maps-ipad/Muscat-road-ipad.svg';
    import MarkerInfo from '../components/markerInfo.vue';
    import AppHeader from '../components/header.vue';
    import config from '../data/config.js';
    export default Vue.component('location', {
        components: {
            WorldImage,
            UAERegionImage,
            OmanRegionImage,
            LebanonRegionImage,
            SharjahCityImage,
            SharjahRoadImage,
            DubaiCityImage,
            DubaiRoadImage,
            LebanonCityImage,
            LebanonRoadImage,
            MuscatCityImage,
            MuscatRoadImage,
            WorldIpadImage,
            UAERegionIpadImage,
            OmanRegionIpadImage,
            LebanonRegionIpadImage,
            SharjahCityIpadImage,
            SharjahRoadIpadImage,
            DubaiCityIpadImage,
            DubaiRoadIpadImage,
            LebanonCityIpadImage,
            LebanonRoadIpadImage,
            MuscatCityIpadImage,
            MuscatRoadIpadImage,
            MarkerInfo,
            AppHeader
        },
        data() {
            return {
                loadingComplete: false,
                ipad: navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null,
                definitions : {
                    'separator': '_',
                    'modifier': '--',
                    'button': 'button',
                    'zoom': 'zoom',
                    'parent': 'parent',
                    'image': 'image',
                    'marker': 'marker'
                },
                scales: {},
                translations: {},
                rotations: {},
                pngImages: {
                    ipad: {
                        'World': require('../images/maps-ipad/World-ipad.png'),
                        'UAERegion': require('../images/maps-ipad/UAE-region-ipad.png'),
                        'OmanRegion': require('../images/maps-ipad/Oman-region-ipad.png'),
                        'LebanonRegion': require('../images/maps-ipad/Lebanon-region-ipad.png'),
                        'SharjahCity': require('../images/maps-ipad/Sharjah-city-ipad.png'),
                        'SharjahRoad': require('../images/maps-ipad/Sharjah-road-ipad.png'),
                        'DubaiCity': require('../images/maps-ipad/Dubai-city-ipad.png'),
                        'DubaiRoad': require('../images/maps-ipad/Dubai-road-ipad.png'),
                        'LebanonCity': require('../images/maps-ipad/Lebanon-city-ipad.png'),
                        'LebanonRoad': require('../images/maps-ipad/Lebanon-road-ipad.png'),
                        'MuscatCity': require('../images/maps-ipad/Muscat-city-ipad.png'),
                        'MuscatRoad': require('../images/maps-ipad/Muscat-road-ipad.png')
                    },
                    table: {
                        'World': require('../images/maps/World.png'),
                        'UAERegion': require('../images/maps/UAE-region.png'),
                        'OmanRegion': require('../images/maps/Oman-region.png'),
                        'LebanonRegion': require('../images/maps/Lebanon-region.png'),
                        'SharjahCity': require('../images/maps/Sharjah-city.png'),
                        'SharjahRoad': require('../images/maps/Sharjah-road.png'),
                        'DubaiCity': require('../images/maps/Dubai-city.png'),
                        'DubaiRoad': require('../images/maps/Dubai-road.png'),
                        'LebanonCity': require('../images/maps/Lebanon-city.png'),
                        'LebanonRoad': require('../images/maps/Lebanon-road.png'),
                        'MuscatCity': require('../images/maps/Muscat-city.png'),
                        'MuscatRoad': require('../images/maps/Muscat-road.png')
                    }
                },
                fullscreenTransform: {
                    'png': {},
                    'svg': {}
                },
                'direction': 'in',
                'markerSelected': null,
                'pulseTimer': null,
                'pulseInterval': null,
                'animationTimer': null,
                'disableAnimation': true
            }
        },
        computed : {
            selectedView : function () {
                return this.$route.query.view;
            },
            scaleStyles: function () {
                // Gets the list of styles available
                if(this.loadingComplete) {
                    let styleList = {};
                    Object.keys(this.scales).forEach( (key, index) => {
                        styleList[key] = this.scales[key][this.selectedView] ? this.scales[key][this.selectedView] : '';
                    });
                    return styleList;
                } else {
                    return {};
                }
            },
            translationStyles: function () {
                // Gets the list of styles available
                if(this.loadingComplete) {
                    let styleList = {};
                    Object.keys(this.translations).forEach( (key, index) => {
                        styleList[key] = this.translations[key][this.selectedView] ? this.translations[key][this.selectedView] : '';
                    });
                    return styleList;
                } else {
                    return {};
                }
            },
            rotationStyles: function () {
                // Gets the list of styles available
                if(this.loadingComplete) {
                    let styleList = {};
                    Object.keys(this.rotations).forEach( (key, index) => {
                        styleList[key] = this.rotations[key][this.selectedView] ? this.rotations[key][this.selectedView] : '';
                    });
                    return styleList;
                } else {
                    return {};
                }
            },
            optionsAvailable: function () {
                if(this.loadingComplete) {
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
                } else {
                    return null;
                }
            },
            markersAvailable: function () {
                if(this.loadingComplete) {
                    let currentMapElement = document.getElementById(this.selectedView);
                    if(currentMapElement) {
                        let children = Array.from(currentMapElement.children);
                        // Loop through each child (we know zoom ids will be the first level)
                        return children.filter( (child) => {
                            // Check is the child's id matches '--zoom'
                            return child.id.match(this.definitions.modifier + this.definitions.marker);
                        }).length;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            },
            masterplanAvailable: function() {
                if(config['masterplan-inactive'].indexOf(this.selectedView) !== -1) {
                    return false;
                } else {
                    return true;
                }
            },
            headerLogo: function () {
                return config.logoMapping[this.$route.query.view];
            },
            backFunctionality: function () {
                return (this.$route.query.view === 'app_x5F_world--parent') ? this.locationMenu : this.zoomOut;
            }
        },
        methods: {
            locationMenu: function () {
                this.$router.push({ path: 'community-selection'});
            },
            zoomOut: function () {
                this.direction = 'out';
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
                this.direction = 'in';
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
                let childView = this.findChildSVG(this.selectedView);
                this.$router.push({ path: 'overview', query: { 'community': config.mappings[childView] } });
            },
            removeActiveMarker: function() {
                let svgImage = document.getElementById('svg-container');
                let markers = svgImage.querySelectorAll('g[id$=--marker]');
                for(let j = 0; j < markers.length; j++) {
                    markers[j].classList.remove('marker-active');
                }
            },
            mapClick: function($event) {
                this.direction = 'in';
                // The path of elements clicked starting from lowest point first
                let pathElements = $event.path;
                // Polyfill path if not on Chrome
                if (!pathElements) pathElements = this.getComposedPath($event.target);
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
                        if(splitId[splitId.length - 1].match(this.definitions.marker)){
                            let country = splitId[0].split(this.definitions.separator).reverse()[0];
                            this.removeActiveMarker();
                            pathElements[i].classList.add('marker-active');
                            this.markerSelected = country.toLowerCase();
                        }
                    }
                }
            },
            findSVGPosition: function(element){
                let rotateTranforms = element.transform.baseVal[0] ? Array.from(element.transform.baseVal).filter( (transform) => transform.type === 4)[0] : null;
                let rotate = rotateTranforms ? rotateTranforms.angle : 0;
                return {
                    'x': element.x.baseVal.value,
                    'y': element.y.baseVal.value,
                    'width': element.width.baseVal.value,
                    'height': element.height.baseVal.value,
                    'rotate': {
                        'origin': [element.x.baseVal.value + (element.width.baseVal.value / 2), element.y.baseVal.value + (element.height.baseVal.value / 2)],
                        'angle': rotate
                    }
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
            },
            findChildSVG: function(id) {
                let ele = document.getElementById(id);
                let child = null;
                // Loops until a lowest child is found
                while(child === null){
                    // Check the element exists and that it has a child
                    if(ele && ele.children){
                        let array = Array.from(ele.children);
                        let matches = array.filter( (child) => child.id.match(this.definitions.modifier + this.definitions.zoom));
                        if(matches.length) {
                            // The parent is assigned as the element, tries process again
                            ele = document.getElementById(matches[0].id.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.parent);
                        } else {
                            child = ele.id;
                        }
                    } else {
                        child = ele.id;
                    }
                }
                return child;
            },
            fitToWindow: (id) => {
                let imageElement = document.getElementById(id);
                let width = (imageElement instanceof SVGElement) ? imageElement.width.baseVal.value : imageElement.width;
                let height = (imageElement instanceof SVGElement) ? imageElement.height.baseVal.value : imageElement.height;
                let scaleX = window.innerWidth / width;
                let scaleY = window.innerHeight / height;
                return (scaleX < scaleY) ? scaleX : scaleY;
            },
            setupSvgImages: function() {
                let svgContainer = document.getElementById('svg-container');
                let svgImages = Array.from(svgContainer.children).filter((child) => child instanceof SVGElement);
                for(let i = 0; i < svgImages.length; i++) {
                    // Adds class to each zoom container
                    let zoomPaths = svgImages[i].querySelectorAll('rect[id$=--zoom]');
                    for(let j = 0; j < zoomPaths.length; j++) {
                        zoomPaths[j].classList.add('container');
                    }
                    let scale = this.fitToWindow(svgImages[i].id);
                    let transform = {
                        'transform': `scale( ${ scale } )`,
                        'transform-origin': '0px 0px 0px'
                    }
                    Vue.set(this.fullscreenTransform.svg, svgImages[i].id, transform);
                }
            },
            setupPngImages: function(callback) {
                let pngContainer = document.getElementById('png-container');
                let pngImages = Array.from(pngContainer.children).map( (child) => {
                    return Array.from(child.children)[0]
                }).map( (child) => {
                    return Array.from(child.children)[0];
                }).map( (child) => {
                    return Array.from(child.children)[0];
                });
                let pngsLoaded = 0;
                let fitPngsToWindow = () => {
                    for(let i = 0; i < pngImages.length; i++) {
                        let imageParentName = pngImages[i].id.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.parent;
                        let scale = this.fitToWindow(pngImages[i].id);
                        let transform = {
                            'transform': `scale( ${ scale } )`,
                            'transform-origin': '0px 0px 0px'
                        }
                        Vue.set(this.fullscreenTransform.png, imageParentName, transform);
                    }
                    callback();
                }
                let pngLoaded = () => {
                    pngsLoaded++;
                    if(pngImages.length === pngsLoaded) {
                        fitPngsToWindow();
                    }
                }
                for(let j = 0; j < pngImages.length; j++) {
                    pngImages[j].addEventListener('load', () => {
                        pngImages[j].removeEventListener('load', () => {});
                        pngLoaded();
                    })
                }
            },
            setupTransforms: function() {
                let container = document.getElementById('svg-container');
                let maps = Array.from(container.children).filter((child) => child instanceof SVGElement);
                // Increment the number of SVGs loaded
                for(let index = 0; index < maps.length; index++) {
                    // The SVG Name image;
                    let name = maps[index].id;
                    // Get all the transformation states possible for this map element
                    let scales = {};
                    let rotations = {};
                    let translations = {};
                    translations[name] = {transform: 'translate3d(0px, 0px, 0px)'};
                    scales[name] = {transform: 'scale(1)'};
                    rotations[name] = {transform: 'rotate(0deg)'};
                    /** GETS THE POSITION WHERE IT SHOULD BE IN THE PARENT SVG **/
                    // Gets the map elements parent SVG;
                    let parentSVG = this.findParentSVG(name.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.zoom);
                    // If it has a parent, finds the position it should be when parent active;
                    let positionInParent = (parentSVG !== '') ? this.getPlacement(name.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.zoom, parentSVG) : null;
                    // Set the CSS style when map elements parent is active
                    if(positionInParent) {
                        rotations[parentSVG] = {
                            'transform': `rotate( ${ positionInParent.rotate.angle }deg )`,
                        };
                        translations[parentSVG] = {
                            transform: `translate3d( ${ -positionInParent.translateX * (positionInParent.scale) }px, ${ -positionInParent.translateY * (positionInParent.scale) }px, 0px )`
                        };
                        scales[parentSVG] = {
                            transform: `scale( ${ 1 / positionInParent.scale }, ${ 1 / positionInParent.scale } )`
                        };
                        rotations[name] = {
                            'transform-origin': `${ (-positionInParent.translateX * positionInParent.scale) + ((maps[index].width.baseVal / 2) * positionInParent.scale) }px ${ (-positionInParent.translateX * positionInParent.scale) + ((maps[index].width.baseVal / 2) * positionInParent.scale) }px }`,
                            'transform': 'rotate(0deg)'
                        };
                    }
                    /** GETS THE CHILDREN IN THE MAP ELEMENT **/
                    // So can zoom into each of these
                    let childSVGContainer = Array.from(maps[index].children);
                    // Loop through each child (we know zoom ids will be the first level)
                    childSVGContainer.forEach( (child) => {
                        // Check is the child's id matches '--zoom'
                        if(child.id.match(this.definitions.modifier + this.definitions.zoom)){
                            // Converts the --zoom to be --parent to refer to another map element
                            let childParent = child.id.split(this.definitions.modifier)[0] + this.definitions.modifier + this.definitions.parent;
                            // Gets the position of the child in the current map element
                            let positionInImage = this.getPlacement(child.id, name);
                            // Sets the CSS transform when the child id is active
                            rotations[childParent] = {
                                'transform': `rotate( ${ -positionInImage.rotate.angle }deg )`,
                                'transform-origin': `${ positionInImage.rotate.origin[0] }px ${ positionInImage.rotate.origin[1] }px`
                            };
                            translations[childParent] = {
                                'transform': `translate3d( ${ positionInImage.translateX }px, ${ positionInImage.translateY }px, 0px)`
                            };
                            scales[childParent] = {
                                transform: `scale( ${ positionInImage.scale }, ${ positionInImage.scale } )`
                            };
                        }
                    });
                    // Vue call to bind the new styles to the data object
                    Vue.set(this.rotations, name, rotations);
                    Vue.set(this.scales, name, scales);
                    Vue.set(this.translations, name, translations);
                }
            },
            getComposedPath: function(el) {
                // Chrome is the only browser that has click event path
                // Polyfill for Chrome's path or rather the composedPath standard
                var path = [];
                while (el) {
                    path.push(el);
                    if (el.tagName === 'HTML') {
                        path.push(document);
                        path.push(window);
                        return path;
                    }
                    el = el.parentElement;
                }
                return path;
            },
            getDefaultMarkerContent: function() {
                let defaultContent = config.markerDefault.filter( (defaults) => defaults.id === this.selectedView);
                if(defaultContent.length) {
                    return defaultContent[0].marker;
                } else {
                    return null;
                }
            },
            pulsateMarkers: function() {
                window.clearTimeout(this.pulseTimer);
                window.clearInterval(this.pulseInterval);
                let element = document.getElementById(this.selectedView);
                let animationContainer = document.getElementById('marker-animations');
                while (animationContainer.firstChild) {
                    animationContainer.removeChild(animationContainer.firstChild);
                }
                let markers = element.querySelectorAll('rect[id$=--tap]');
                markers.forEach( marker => {
                    let x = marker.x.baseVal.value;
                    let y = marker.y.baseVal.value;
                    let width = marker.width.baseVal.value;
                    let height = marker.height.baseVal.value;
                    let div = document.createElement('div');
                    div.id = marker.id.split('--')[0] + '--pulse';
                    div.classList.add('pulse');
                    let scale = parseFloat(this.fullscreenTransform.svg[this.selectedView].transform.replace( /^\D+/g, ''));
                    div.style.left = (x * scale) + 'px';
                    div.style.top = (y * scale) + 'px';
                    div.style.width = (width * scale) + 'px';
                    div.style.height = (height * scale) + 'px';
                    animationContainer.appendChild(div);
                } )
                this.pulseInterval = window.setInterval( () => {
                    animationContainer.classList.remove('active');
                    this.pulseTimer = window.setTimeout( () => {
                        animationContainer.classList.add('active');
                    }, 750)
                }, 2000);
                this.animationTimer = window.setTimeout( () => {
                    this.disableAnimation = false;
                }, 100 )
            }
        },
        mounted(){
            var $section = $('#svg-container');
            $section.find('.panzoom').pinchzoomer();
            // var $panzoom = $section.find('.panzoom').panzoom({
            //     contain: 'invert',
            //     minScale: 1
            // });
            // // debugger;
            // $panzoom.parent().on('mousewheel.focal', ( e ) => {
            //     e.preventDefault();
            //     var delta = e.delta || e.originalEvent.wheelDelta;
            //     var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            //     $panzoom.panzoom('zoom', zoomOut, {
            //         increment: 0.1,
            //         animate: false,
            //         panOnlyWhenZoomed: true,
            //         minScale: 1
            //         // focal:e
            //     });
            // });
            let callback = () => {
                this.loadingComplete = true;
                this.markerSelected = this.getDefaultMarkerContent();
                this.pulsateMarkers();
            }
            this.setupSvgImages();
            this.setupTransforms();
            this.setupPngImages(callback);
        },
        watch: {
            selectedView: function(val) {
                this.markerSelected = this.getDefaultMarkerContent();
                this.pulsateMarkers();
            }
        },
        beforeDestroy() {
            window.clearTimeout(this.animationTimer);
            window.clearTimeout(this.pulseTimer);
            window.clearInterval(this.pulseInterval);
        }
     });
</script>
<template>
<div class="app">
    <AppHeader :logo="headerLogo" back="true" v-on:back="backFunctionality" />
    <div class="container" :class="{'loaded': loadingComplete}">
        <div id="map-container" class="map" :class="{'ipad': ipad}" @click="mapClick($event)">
            <v-touch v-on:pinchout="zoomIn">
                <div id="png-container" :style="[fullscreenTransform.png[selectedView]]" :class="{'in': direction === 'in', 'out': direction === 'out', 'disable-animation': disableAnimation }">
                    <!-- World -->
                    <div
                        class="png-image-container-scale"
                        :style="[scaleStyles['app_x5F_world--parent']]"
                        :class="{ 'active': selectedView === 'app_x5F_world--parent' }">
                        <div
                            class="png-image-container-translate"
                            :style="[translationStyles['app_x5F_world--parent']]">
                            <div
                                class="png-image-container-rotation"
                                :style="[rotationStyles['app_x5F_world--parent']]">
                                <img
                                    v-if="ipad"
                                    id="app_x5F_world--image"
                                    class="png-image"
                                    :src="pngImages.ipad.World" />
                                <img
                                    v-if="!ipad"
                                    id="app_x5F_world--image"
                                    class="png-image"
                                    :src="pngImages.table.World" />
                            </div>
                        </div>
                    </div>
                    <!-- End of World -->
                    <!-- UAE -->
                    <div
                        class="png-image-container-scale"
                        :style="[scaleStyles['app_x5F_UAE--parent']]"
                        :class="{ 'active': selectedView === 'app_x5F_UAE--parent' }">
                        <div
                            class="png-image-container-translate"
                            :style="[translationStyles['app_x5F_UAE--parent']]">
                            <div
                                class="png-image-container-rotation"
                                :style="[rotationStyles['app_x5F_UAE--parent']]">
                                <img
                                    v-if="ipad"
                                    id="app_x5F_UAE--image"
                                    class="png-image"
                                    :src="pngImages.ipad.UAERegion" />
                                <img
                                    v-if="!ipad"
                                    id="app_x5F_UAE--image"
                                    class="png-image"
                                    :src="pngImages.table.UAERegion" />

                            </div>
                        </div>
                    </div>
                    <!-- End of UAE -->
                    <!-- Oman -->
                    <div
                        class="png-image-container-scale"
                        :style="[scaleStyles['app_x5F_Oman--parent']]"
                        :class="{ 'active': selectedView === 'app_x5F_Oman--parent' }">
                        <div
                            class="png-image-container-translate"
                            :style="[translationStyles['app_x5F_Oman--parent']]">
                            <div
                                class="png-image-container-rotation"
                                :style="[rotationStyles['app_x5F_Oman--parent']]">
                                <img
                                    v-if="ipad"
                                    id="app_x5F_Oman--image"
                                    class="png-image"
                                    :src="pngImages.ipad.OmanRegion" />
                                <img
                                    v-if="!ipad"
                                    id="app_x5F_Oman--image"
                                    class="png-image"
                                    :src="pngImages.table.OmanRegion" />
                            </div>
                        </div>
                    </div>
                    <!-- End of Oman -->
                    <!-- Lebanon Region -->
                    <div
                        class="png-image-container-scale"
                        :style="[scaleStyles['app_x5F_Lebanon-region--parent']]"
                        :class="{ 'active': selectedView === 'app_x5F_Lebanon-region--parent' }">
                        <div
                            class="png-image-container-translate"
                            :style="[translationStyles['app_x5F_Lebanon-region--parent']]">
                            <div
                                class="png-image-container-rotation"
                                :style="[rotationStyles['app_x5F_Lebanon-region--parent']]">
                                <img
                                    v-if="ipad"
                                    id="app_x5F_Lebanon-region--image"
                                    class="png-image"
                                    :src="pngImages.ipad.LebanonRegion" />
                                <img
                                    v-if="!ipad"
                                    id="app_x5F_Lebanon-region--image"
                                    class="png-image"
                                    :src="pngImages.table.LebanonRegion" />
                            </div>
                        </div>
                    </div>
                    <!-- End of Lebanon Region -->
                    <!-- Sharjah City -->
                    <div
                        class="png-image-container-scale"
                        :class="{ 'active': selectedView === 'app_x5F_Sharjah--parent' }"
                        :style="[scaleStyles['app_x5F_Sharjah--parent']]">
                        <div
                            class="png-image-container-translate"
                            :style="[translationStyles['app_x5F_Sharjah--parent']]">
                            <div
                                class="png-image-container-rotation"
                                :style="[rotationStyles['app_x5F_Sharjah--parent']]">
                                <img
                                    v-if="ipad"
                                    id="app_x5F_Sharjah--image"
                                    class="png-image"
                                    :src="pngImages.ipad.SharjahCity" />
                                <img
                                    v-if="!ipad"
                                    id="app_x5F_Sharjah--image"
                                    class="png-image"
                                    :src="pngImages.table.SharjahCity" />
                            </div>
                        </div>
                    </div>
                    <!-- End of Sharjah City -->
                    <!-- Sharjah Road -->
                    <div
                        class="png-image-container-scale"
                        :style="[scaleStyles['app_x5F_Sharjah-road--parent']]"
                        :class="{ 'active': selectedView === 'app_x5F_Sharjah-road--parent' }">
                        <div
                            class="png-image-container-translate"
                            :style="[translationStyles['app_x5F_Sharjah-road--parent']]">
                            <div
                                class="png-image-container-rotation"
                                :style="[rotationStyles['app_x5F_Sharjah-road--parent']]">
                                <img
                                    v-if="ipad"
                                    id="app_x5F_Sharjah-road--image"
                                    class="png-image"
                                    :src="pngImages.ipad.SharjahRoad" />
                                <img
                                    v-if="!ipad"
                                    id="app_x5F_Sharjah-road--image"
                                    class="png-image"
                                    :src="pngImages.table.SharjahRoad" />
                            </div>
                        </div>
                    </div>
                    <!-- End of Sharjah Road -->
                   
                    <!-- Lebanon City -->
                    <div
                        class="png-image-container-scale"
                        :class="{ 'active': selectedView === 'app_x5F_Lebanon--parent' }"
                        :style="[scaleStyles['app_x5F_Lebanon--parent']]">
                        <div
                            class="png-image-container-translate"
                            :style="[translationStyles['app_x5F_Lebanon--parent']]">
                            <div
                                class="png-image-container-rotation"
                                :style="[rotationStyles['app_x5F_Lebanon--parent']]">
                                <img
                                    v-if="ipad"
                                    id="app_x5F_Lebanon--image"
                                    class="png-image"
                                    :src="pngImages.ipad.LebanonCity" />
                                <img
                                    v-if="!ipad"
                                    id="app_x5F_Lebanon--image"
                                    class="png-image"
                                    :src="pngImages.table.LebanonCity" />
                            </div>
                        </div>
                    </div>
                    <!-- End of Lebanon City -->
                    <!-- Lebanon Road -->
                    <div
                        class="png-image-container-scale"
                        :style="[scaleStyles['app_x5F_Lebanon-road--parent']]"
                        :class="{ 'active': selectedView === 'app_x5F_Lebanon-road--parent' }">
                        <div
                            class="png-image-container-translate"
                            :style="[translationStyles['app_x5F_Lebanon-road--parent']]">
                            <div
                                class="png-image-container-rotation"
                                :style="[rotationStyles['app_x5F_Lebanon-road--parent']]">
                                <img
                                    v-if="ipad"
                                    id="app_x5F_Lebanon-road--image"
                                    class="png-image"
                                    :src="pngImages.ipad.LebanonRoad" />
                                <img
                                    v-if="!ipad"
                                    id="app_x5F_Lebanon-road--image"
                                    class="png-image"
                                    :src="pngImages.table.LebanonRoad" />
                            </div>
                        </div>
                    </div>
                    <!-- End of Lebanon Road -->
                    <!-- Muscat City -->
                    <div
                        class="png-image-container-scale"
                        :style="[scaleStyles['app_x5F_Muscat--parent']]"
                        :class="{ 'active': selectedView === 'app_x5F_Muscat--parent' }">
                        <div
                            class="png-image-container-translate"
                            :style="[translationStyles['app_x5F_Muscat--parent']]">
                            <div
                                class="png-image-container-rotation"
                                :style="[rotationStyles['app_x5F_Muscat--parent']]">
                                <img
                                    v-if="ipad"
                                    id="app_x5F_Muscat--image"
                                    class="png-image"
                                    :src="pngImages.ipad.MuscatCity" />
                                <img
                                    v-if="!ipad"
                                    id="app_x5F_Muscat--image"
                                    class="png-image"
                                    :src="pngImages.table.MuscatCity" />
                            </div>
                        </div>
                    </div>
                    <!-- End of Muscat City -->
                    <!-- Muscat Road -->
                    <div
                        class="png-image-container-scale"
                        :style="[scaleStyles['app_x5F_Muscat-road--parent']]"
                        :class="{ 'active': selectedView === 'app_x5F_Muscat-road--parent' }">
                        <div
                            class="png-image-container-translate"
                            :style="[translationStyles['app_x5F_Muscat-road--parent']]">
                            <div
                                class="png-image-container-rotation"
                                :style="[rotationStyles['app_x5F_Muscat-road--parent']]">
                                <img
                                    v-if="ipad"
                                    id="app_x5F_Muscat-road--image"
                                    class="png-image"
                                    :src="pngImages.ipad.MuscatRoad" />
                                <img
                                    v-if="!ipad"
                                    id="app_x5F_Muscat-road--image"
                                    class="png-image"
                                    :src="pngImages.table.MuscatRoad" />
                            </div>
                        </div>
                    </div>
                    <!-- End of Muscat Road -->
                </div>

                <!-- Marker Pulses -->
                <div id="marker-animations"></div>
                
                <section id="svg-container" :style="[fullscreenTransform.svg[selectedView]]" >
                    <!-- World -->
                    <transition name="map-switch">
                        <WorldImage
                            v-if="!ipad"
                            class="image"
                            v-show="selectedView === 'app_x5F_world--parent'" />
                        <WorldIpadImage
                            v-if="ipad"
                            class="image"
                            v-show="selectedView === 'app_x5F_world--parent'" />
                    </transition>
                    <!-- End of World -->
                    <!-- UAE -->
                    <transition name="map-switch">
                        <UAERegionImage
                            v-if="!ipad"
                            class="image"
                            v-show="selectedView === 'app_x5F_UAE--parent'" />
                        <UAERegionIpadImage
                            v-if="ipad"
                            class="image"
                            v-show="selectedView === 'app_x5F_UAE--parent'" />
                    </transition>
                    <!-- End of UAE -->
                    <!-- UAE -->
                    <transition name="map-switch">
                        <OmanRegionImage
                            v-if="!ipad"
                            class="image"
                            v-show="selectedView === 'app_x5F_Oman--parent'" />
                        <OmanRegionIpadImage
                            v-if="ipad"
                            class="image"
                            v-show="selectedView === 'app_x5F_Oman--parent'" />
                    </transition>
                    <!-- End of UAE -->
                    <!-- UAE -->
                    <transition name="map-switch">
                        <LebanonRegionImage
                            v-if="!ipad"
                            class="image"
                            v-show="selectedView === 'app_x5F_Lebanon-region--parent'" />
                        <LebanonRegionIpadImage
                            v-if="ipad"
                            class="image"
                            v-show="selectedView === 'app_x5F_Lebanon-region--parent'" />
                    </transition>
                    <!-- End of UAE -->
                    <!-- Sharjah City -->
                    <transition name="map-switch">
                        <SharjahCityImage
                            v-if="!ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Sharjah--parent'" />
                        <SharjahCityIpadImage
                            v-if="ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Sharjah--parent'" />
                    </transition>
                    <!-- End of Sharjah City -->
                    <!-- Sharjah Road -->
                    <transition name="map-switch">
                        <SharjahRoadImage
                            v-if="!ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Sharjah-road--parent'" />
                        <SharjahRoadIpadImage
                            v-if="ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Sharjah-road--parent'" />
                    </transition>
                    <!-- End of Sharjah Road -->
                    <!-- Dubai -->
                    <transition name="map-switch">
                        <DubaiCityImage
                            v-if="!ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Dubai--parent'" />
                        <DubaiCityIpadImage
                            v-if="ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Dubai--parent'" />
                    </transition>
                    <!-- End of Dubai -->
                    <!-- Dubai Road -->
                    <transition name="map-switch">
                        <DubaiRoadImage
                            v-if="!ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Dubai-road--parent'" />
                        <DubaiRoadIpadImage
                            v-if="ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Dubai-road--parent'" />
                    </transition>
                    <!-- End of Dubai Road -->
                    <!-- Lebanon City -->
                    <transition name="map-switch">
                        <LebanonCityImage
                            v-if="!ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Lebanon--parent'" />
                        <LebanonCityIpadImage
                            v-if="ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Lebanon--parent'" />
                    </transition>
                    <!-- End of Lebanon City -->
                    <!-- Lebanon Road -->
                    <transition name="map-switch">
                        <LebanonRoadImage
                            v-if="!ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Lebanon-road--parent'" />
                        <LebanonRoadIpadImage
                            v-if="ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Lebanon-road--parent'" />
                    </transition>
                    <!-- End of Lebanon Road -->
                    <!-- Muscat City -->
                    <transition name="map-switch">
                        <MuscatCityImage
                            v-if="!ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Muscat--parent'" />
                        <MuscatCityIpadImage
                            v-if="ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Muscat--parent'" />
                    </transition>
                    <!-- End of Muscat City -->
                    <!-- Muscat Road -->
                    <transition name="map-switch">
                        <MuscatRoadImage
                            v-if="!ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Muscat-road--parent'" />
                        <MuscatRoadIpadImage
                            v-if="ipad"
                            class="image panzoom"
                            v-show="selectedView === 'app_x5F_Muscat-road--parent'" />
                    </transition>
                    <!-- End of Muscat Road -->
                </section>
                <div class="loading" v-if="!loadingComplete"></div>
            </v-touch>
            </div>

            <transition name="marker-info">
                <MarkerInfo v-if="markersAvailable" :country="markerSelected"></MarkerInfo>
            </transition>

            <div class="controls" v-show="optionsAvailable === 1 || optionsAvailable === 0">
                <div class="controls-row">
                    <button class="button zoom" type="button" @click="zoomOut()">Zoom Out</button>
                    <button class="button zoom" :class="{ 'disabled': optionsAvailable === 0 }" type="button" @click="zoomIn()">Zoom In</button>
                </div>
                <div class="controls-row" v-if="masterplanAvailable">
                    <button class="button masterplan" type="button" @click="viewMasterplan()">View Masterplan</button>
                </div>
            </div>
        </div>
</div>
</template>
<style>
    section { text-align: center; margin: 50px 0;margin-top:0px; }
      .panzoom-parent { border: 2px solid #333; }
      .panzoom-parent .panzoom { border: 2px dashed #666; }
</style>

<style lang="scss">
    #marker-animations {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        &.active {
            .pulse {
                &:after {
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    transition: all 1.25s ease-out;
                    border-width: 0.075rem;
                }
            }
        }
    }
    .marker-active {
        polygon {
            fill: #b4975a;
        }
    }
    .pulse {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-transform-style: preserve-3d;
        -webkit-backface-visibility: hidden;
        &:after {
            content: '';
            border-radius: 100%;
            border: 0rem solid #8A1538;
            transform: scale(2);
            width: 0px;
            height: 0px;
            opacity: 1;
            -webkit-transform-style: preserve-3d;
            -webkit-backface-visibility: hidden;
        }
    }
</style>
<style lang="scss">
.zoom-container {
    visibility: hidden !important;
}
#png-container {
    position: absolute;
    left: 0;
    top: 0;
    &.disable-animation {
        .png-image-container-scale {
            transition: none !important;
        }
        .png-image-container-translate {
            transition: none !important;
        }
        .png-image-container-rotation {
            transition: none !important;
        }
    }
    .png-image-container-scale {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        opacity: 0;
    }
    &.in {
        .png-image-container-scale {
            -webkit-backface-visibility: hidden;
            transition: transform 1s linear 0.25s, opacity 0.1s linear 1.25s;
            &.active {
                opacity: 1;
                -webkit-backface-visibility: hidden;
                transition: transform 1s linear 0.25s, opacity 0.1s linear 0s;
            }
            .png-image-container-translate {
                -webkit-backface-visibility: hidden;
                transition: transform 0.45s ease-out 0.25s;
            }
            .png-image-container-rotation {
                -webkit-backface-visibility: hidden;
                transition: transform 0.25s linear 0.75s;
            }
        }
    }
    &.out {
        .png-image-container-scale {
            -webkit-backface-visibility: hidden;
            transition: transform 1s linear 0.25s, opacity 0.1s linear 1.25s;
            &.active {
                opacity: 1;
                -webkit-backface-visibility: hidden;
                transition: transform 1s linear 0.25s, opacity 0.1s linear 0s;
            }
            .png-image-container-translate {
                -webkit-backface-visibility: hidden;
                transition: transform 0.445s ease-out 0.805s;
            }
            .png-image-container-rotation {
                -webkit-backface-visibility: hidden;
                transition: transform 0.25s linear 0.5s;
            }
        }
    }
}
#svg-container {
    position: absolute;
    left: 0;
    top: 0;
    overflow: visible !important;
}
.loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}
</style>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    opacity: 0;
    pointer-events: none;
    &.loaded {
        opacity: 1;
        pointer-events: auto;
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
    background-color: #ffffff;
    &.ipad {
        width: 100%;
        height: 75%;
        display: flex;
        position: fixed;
        left: 0;
        top: 8rem;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-color: #ffffff;
        box-shadow: 0.1rem 0.1rem 1rem #cccccc;
    }
}
.image {
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
.controlHolder{
    display: none;
}
.controls {
    position: absolute;
    bottom: 1.5rem;
    left: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    .controls-row {
        display: flex;
        width: 100%;
        margin: 0.5rem 0;
        .button {
            font-size: 1.35rem;
            margin: 0;
            flex: 1;
            padding: 0.75rem 0;
            outline: none;
            font-weight: 200;
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