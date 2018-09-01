<script>
    import Vue from 'vue';
    var VueTouch = require('vue-touch');
    Vue.use(VueTouch, {name: 'v-touch'});
    import AlZahia from '../images/overalls/overview-alzahia.svg';
    import AlMouj from '../images/overalls/overview-almouj.svg';
    import WaterfrontCity from '../images/overalls/overview-waterfront.svg';
    import TilalAlGhaf from '../images/overalls/overview-tilalalghaf.svg';
    import Uptown from '../images/overalls/overview-uptown.svg';
    import config from '../data/config.js';
    import AppHeader from '../components/header.vue';
    export default Vue.component('overview', {
        components: {
            AppHeader,
            AlZahia,
            AlMouj,
            WaterfrontCity,
            TilalAlGhaf,
            Uptown
        },
        data() {
            this.zoomed = false;
            this.scaleXDivider = 150;
            this.scaleYDivider = 75;
            return {
                svgScale: null,
                images: {
                    'alzahia': require('../images/overalls/overview-alzahia.png'),
                    'almouj': require('../images/overalls/overview-almouj.png'),
                    'waterfrontcity': require('../images/overalls/overview-waterfront.jpg'),
                    'tilalalghaf': require('../images/overalls/overview-tilalalghaf.png'),
                    'uptown': require('../images/overalls/overview-uptown.png')
                }
            }
        },
        computed: {
            selectedCommunity: function() {
                return this.$route.query.community;
            }
        },
        methods: {
            backToMap: function() {
                let mapLocation = Object.keys(config.mappings).filter( (key) => config.mappings[key] === this.$route.query.community)[0];
                if(this.selectedCommunity === "uptown"){
                    this.$router.push({ path: 'overview', query: { 'community': 'alzahia' }});
                } else {
                    this.$router.push({ path: 'location', query: { 'view': mapLocation }});
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
            svgPressed: function($event) {
                // Polyfill path if not on Chrome
                let pathElements = $event.path;
                if (!pathElements) pathElements = this.getComposedPath($event.target);
                let path = pathElements[0].id;
                let splitPath = path.split('_x5F_');
                if(splitPath[splitPath.length - 1] === 'tap'){
                    let neighbourhood = splitPath[0].replace(/_/g, '').toLowerCase();
                    /* if(this.selectedCommunity === 'tilalalghaf') {
                        this.$router.push({ path: 'tilalalghaf', query: { 'community': this.$route.query.community, 'neighbourhood': neighbourhood } });
                    }
                    else */
                    if(this.selectedCommunity === 'alzahia' && neighbourhood === "uptown"){
                        this.$router.push({ path: 'overview', query: { 'community': 'uptown' } });
                    }
                    else if(this.selectedCommunity === 'uptown' && neighbourhood === "woroud"){
                        this.$router.push({ path: 'uptown', query: { 'community': this.$route.query.community, 'neighbourhood': neighbourhood } });
                    }
                    else if(this.selectedCommunity === 'uptown' && neighbourhood === "zohour"){
                        this.$router.push({ path: 'uptown', query: { 'community': this.$route.query.community, 'neighbourhood': neighbourhood } });
                    }
                    else {
                        this.$router.push({ path: 'community', query: { 'community': this.$route.query.community, 'neighbourhood': neighbourhood } });
                    }
                }
            },
            locationImageContainerZoomIn: function(args) {
                if ( args === 'alzahia'){
                }
                else{
                    let locationImageContainer = document.getElementById("community_image");
                    let transformStyleText = locationImageContainer.style.transform;
                    if (transformStyleText.indexOf('scale(') != -1){
                        let scaleText = (transformStyleText.split('scale(')[1]).split(')')[0];
                        let currentScale = parseFloat(scaleText);
                        if (currentScale < 5.0)
                        {
                          let newScale = currentScale * 1.05;
                          locationImageContainer.setAttribute("style","transform:scale(" + newScale + ")");
                          let locationSVGContainer = document.getElementById("svg");
                          locationImageContainer.setAttribute("style","transform:scale(" + newScale + ")");  
                        }
                        
                    }
                    else{
                        let newScale = 1 * 1.05;
                        locationImageContainer.setAttribute("style","transform:scale(" + newScale + ")");
                        let locationSVGContainer = document.getElementById("svg");
                        locationImageContainer.setAttribute("style","transform:scale(" + newScale + ")");
                    }
                    
                    this.zoomed = true;
                }
                
            },
            locationImageContainerZoomOut: function(args) {
                if ( args === 'alzahia'){
                }
                else{
                    let locationImageContainer = document.getElementById("community_image");
                    let transformStyleText = locationImageContainer.style.transform;
                    let scaleText = (transformStyleText.split('scale(')[1]).split(')')[0];
                    let currentScale = parseFloat(scaleText);
                    if (currentScale > 1.0)
                    {
                      let newScale = currentScale / 1.05;
                      locationImageContainer.setAttribute("style","transform:scale(" + newScale + ")");
                      let locationSVGContainer = document.getElementById("svg");
                      locationImageContainer.setAttribute("style","transform:scale(" + newScale + ")"); 
                    }
                    else{
                        this.zoomed = false;
                    }
                    
                }
            },
           locationImageContainerPan: function(args, event) {
                let scaleOfSwipeInX = Math.round((event.deltaX) / this.scaleXDivider);
                let scaleOfSwipeInY = Math.round((event.deltaY) / this.scaleYDivider);
                
                console.log(scaleOfSwipeInX, scaleOfSwipeInY);
                
                if ( args === 'alzahia'){
                    }
                else{
                    if (this.zoomed){
                        let currentYPosition = 0;
                        let currentXPosition = 0;
                        let locationImageContainer = document.getElementById("community_image");
                        let transformStyleText = locationImageContainer.style.transform;
                        if (transformStyleText.indexOf('translateY(') != -1){
                            let translateYText = (transformStyleText.split('translateY(')[1]).split('px)')[0];
                            currentYPosition = parseFloat(translateYText);
                        }
                        if (transformStyleText.indexOf('translateX(') != -1){
                            let translateXText = (transformStyleText.split('translateX(')[1]).split('px)')[0];
                            currentXPosition = parseFloat(translateXText);
                        }
                        console.log(currentXPosition, currentYPosition);
                        let scaleText = (transformStyleText.split('scale(')[1]).split(')')[0];
                        let currentScale = parseFloat(scaleText);
                        let NewXPosition = currentXPosition + (70 * scaleOfSwipeInX);
                        let NewYPosition = currentYPosition + (35 * scaleOfSwipeInY);
                        if (NewXPosition > (240 * currentScale))
                            NewXPosition = (240 * currentScale)
                        else if (NewXPosition < -(240 * currentScale))
                            NewXPosition = -(240 * currentScale)
                        if (NewYPosition > (100 * currentScale))
                            NewYPosition = (100 * currentScale)
                        else if (NewYPosition < -(100 * currentScale))
                            NewYPosition = -(100 * currentScale)
                        locationImageContainer.setAttribute("style","transform:translateX("+ NewXPosition +"px) scale("+ currentScale +") translateY(" + NewYPosition +"px)");
                    }
                }
            },
        },
        mounted() {
            let svgImage = document.getElementById('svg');
            this.svgScale = {'transform': 'scale(' + (window.innerWidth / svgImage.width.baseVal.value) + ')' };
            if(this.selectedCommunity === 'tilalalghaf'){
                //svgImage.setAttribute("style", "opacity:0");
            }

            var $panzoom = $('#container-zoom > svg').panzoom({

                contain: 'invert'
            });
            
            $panzoom.parent().on('mousewheel.focal', ( e ) => {
                e.preventDefault();
                var delta = e.delta || e.originalEvent.wheelDelta;
                var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
                $panzoom.panzoom('zoom', zoomOut, {
                    increment: 0.1,
                    animate: false,
                    panOnlyWhenZoomed: true,
                    minScale: 1,
                    focal:e
                });
            });
    
        }
    });
</script>

<template>
<div class="app">
    <AppHeader :logo="selectedCommunity" v-on:back="backToMap" back="true" />
    <transition name="page" appear>
        <v-touch v-on:pinchout="locationImageContainerZoomIn(selectedCommunity)" v-on:pinchin="locationImageContainerZoomOut(selectedCommunity)" v-on:pan="locationImageContainerPan(selectedCommunity, $event)" v-bind:pan-options="{ direction: 'all', threshold: 10 }">
            <div class="container" @click="svgPressed($event)" id="container-zoom">
                
                <AlZahia class="image" id="svg" v-if="selectedCommunity === 'alzahia'" :style="[svgScale]" /    >
                <AlMouj class="image" id="svg" v-if="selectedCommunity === 'almouj'" :style="[svgScale]" />
                <WaterfrontCity class="image" id="svg" v-if="selectedCommunity === 'waterfrontcity'" :style="[svgScale]" />
                <TilalAlGhaf class="image" id="svg" v-if="selectedCommunity === 'tilalalghaf'" :style="[svgScale]"/>
                <Uptown class="image" id="svg" v-if="selectedCommunity === 'uptown'" :style="[svgScale]" />
            </div>
        </v-touch>
    </transition>
</div>
</template>

<style lang="scss">
#Tap_area {
    path,
    polygon {
        fill: rgba(0,0,0,0);
    }
}
</style>

<style lang="scss" scoped>
.app {
    position: relative;
    overflow: hidden;
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
        position: static !important;
    .image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        position: absolute;
        object-position: top;
        left: 0;
        top: 0;
    }
    #svg {
        position: absolute;
        left: 0;
        top: 0;
        transform-origin: 0 0;
    }
}
</style>