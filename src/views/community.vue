<script>
    import Vue from 'vue';
    var VueTouch = require('vue-touch');
    Vue.use(VueTouch, {name: 'v-touch'});
    import AppHeader from '../components/header.vue';
    import PropertyFilter from '../components/propertyFilter.vue';
    import PropertyInfo from '../components/propertyInfo.vue';

    import AlZahia from '../images/masterplans/al_zahia_masterplan.svg';
    import AlMouj from '../images/masterplans/al_mouj_masterplan.svg';
    import WaterfrontCity from '../images/masterplans/waterfront_city_masterplan.svg';
    import TilalAlGhaf from '../images/masterplans/tilal_al_ghaf_masterplan.svg';
    import axios from 'axios';
    import config from '../data/config.js';
    import soldOutCommunities from '../data/soldOutCommunities.js';
    import communityPositions from '../data/communityPositions.js';

    import galleryMapping from '../data/galleryMapping.js';

    export default Vue.component('community', {
        components: {
            AppHeader,
            PropertyFilter,
            PropertyInfo,
            AlZahia,
            AlMouj,
            WaterfrontCity,
            TilalAlGhaf
        },
        data() {
            return {
                soldOutContainerWidth: 0,
                soldOutContainerHeight: 0,
                loaded: false,
                oneFilterCommunity: config.oneFilterCommunities.indexOf(this.$route.query.community) !== -1,
                propertyTypeFilter: {},
                amenitiesFilter: false,
                propertyInfoActive: false,
                activeProperty: null,
                pngContainerScale: null,
                svgContainerScale: null,
                pngTransform: null,
                svgTransform: null,
                images: {
                    alzahia: {
                        aljouri: require('../images/masterplans/alzahia-al-jouri.png'),
                        allilac: require('../images/masterplans/alzahia-al-lilac.png'),
                        alnarjis: require('../images/masterplans/alzahia-al-narjis.png'),
                        gardenapts: require('../images/masterplans/alzahia-garden-apts.png')
                    },
                    almouj: {
                        acacia: require('../images/masterplans/almouj-acacia.png'),
                        almeriaeast: require('../images/masterplans/almouj-almeria-east.png'),
                        almerianorth: require('../images/masterplans/almouj-almeria-north.png'),
                        almeriasouth: require('../images/masterplans/almouj-almeria-south.png'),
                        beachlink: require('../images/masterplans/almouj-beach-link.png'),
                        ghadeerparks: require('../images/masterplans/almouj-ghadeer-parks.png'),
                        juman1: require('../images/masterplans/almouj-juman-1.png'),
                        juman2: require('../images/masterplans/almouj-juman-2.png'),
                        liwan: require('../images/masterplans/almouj-liwan.png'),
                        luban: require('../images/masterplans/almouj-luban.png'),
                        marsagardens: require('../images/masterplans/almouj-marsa-gardens.png'),
                        marsa1: require('../images/masterplans/almouj-marsa-1.png'),
                        marsa2: require('../images/masterplans/almouj-marsa-2.png'),
                        marsa3: require('../images/masterplans/almouj-marsa-3.png'),
                        neem: require('../images/masterplans/almouj-neem.png'),
                        reehangardens: require('../images/masterplans/almouj-reehan-gardens.png'),
                        reehanresidence: require('../images/masterplans/almouj-reehan-residence.png'),
                        sector1: require('../images/masterplans/almouj-sector-1.png'),
                        sector2: require('../images/masterplans/almouj-sector-2.png'),
                        sector3: require('../images/masterplans/almouj-sector-3.png'),
                        sector4: require('../images/masterplans/almouj-sector-4.png'),
                        siraj: require('../images/masterplans/almouj-siraj.png'),
                        thegardens: require('../images/masterplans/almouj-the-gardens.png'),
                        zunairah: require('../images/masterplans/almouj-zunairah.png')
                    },
                    waterfrontcity: {
                        waterfrontcity: require('../images/masterplans/waterfront-waterfront.jpg')
                    },
                    tilalalghaf: {
                        phasea: require('../images/masterplans/tilalalghaf-phasea.png')
                    }
                },
                propertyList: [],
                availableList: [],
                data: null,
                soldOutDetails: null,
                table: process.env.NODE_ENV === 'table'
            }
        },
        computed: {
            community: function() {
                return this.$route.query.community;
            },
            neighbourhood: function() {
                return this.$route.query.neighbourhood;
            },
            filterPng: function() {
                return Object.keys(this.propertyTypeFilter).filter( (key) => this.propertyTypeFilter[key] ).length;
            }
        },
        methods: {
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
            backToOverview: function() {
                this.$router.push({ path: 'overview', query: {community: this.community} });
            },
            setPropertyTypeFilter: function(key) {
                if(this.oneFilterCommunity) {
                    Object.keys(this.propertyTypeFilter).forEach( (type) => {
                        if(type !== key) {
                            Vue.set(this.propertyTypeFilter, type, false);
                        }
                    } );
                    Vue.set(this.propertyTypeFilter, key, !this.propertyTypeFilter[key]);
                } else {
                    Vue.set(this.propertyTypeFilter, key, !this.propertyTypeFilter[key]);
                }
            },
            setAmenitiesFilter: function() {
                this.amenitiesFilter = !this.amenitiesFilter;
            },
            openPropertyInfo: function(data) {
                this.activeProperty = data;
                this.propertyInfoActive = true;
            },
            closePropertyInfo: function() {
                this.activeProperty = null;
                this.propertyInfoActive = false;
            },
            svgPressed: function($event) {
                // Polyfill path if not on Chrome
                console.log("click for popup ....")
                debugger;
                let pathElements = $event.path;
                if (!pathElements) pathElements = this.getComposedPath($event.target);
                let elementPressed = pathElements[0];
                if(elementPressed.id){
                    let plotId = elementPressed.id.split('_').filter( (part) => part.length);
                    let plotNumber = plotId[plotId.length - 1];
                    let plotInfo = this.data.filter( (item) => plotNumber === item.id)[0];
                    if(plotInfo) this.openPropertyInfo(plotInfo);
                }
            },
            getData: function(query) {
                let url = query ? config.url[config.mode] + 'maf_plot?' + query : config.url[config.mode] + 'maf_plot';
                console.log(url);
                return axios({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Authorization': 'Basic ' + btoa('maf:25st0rest')
                    }
                })
            },
            soldOutContainerZoomIn: function() {
                let soldOutContainer = document.getElementById("sold-out");
                let soldOutContainerCurrentWidth = soldOutContainer.clientWidth;
                let soldOutContainerNewWidth = soldOutContainerCurrentWidth + 25;
                soldOutContainer.setAttribute("style","width:" + soldOutContainerNewWidth + "px");

            },
            soldOutContainerZoomOut: function() {
                let soldOutContainer = document.getElementById("sold-out");
                let soldOutContainerCurrentWidth = soldOutContainer.clientWidth;
                let soldOutContainerNewWidth = soldOutContainerCurrentWidth - 10;
                if ((soldOutContainerNewWidth / window.innerWidth) * 100 < 70)
                    soldOutContainer.setAttribute("style","width:70%");
                else
                    soldOutContainer.setAttribute("style","width:" + soldOutContainerNewWidth + "px");
            },
            locationImageContainerZoomIn: function() {
                let zoomableArea = document.getElementById("area");
                zoomableArea.setAttribute("style","transform:scale(1.75, 1.75)");
                this.zoomed = true;
            },
            locationImageContainerZoomOut: function() {
                let zoomableArea = document.getElementById("area");
                zoomableArea.setAttribute("style","transform:scale(1)");
                this.zoomed = false;
            },
            locationImageContainerPan: function(event) {
                let scaleOfSwipeInX = Math.round((event.deltaX) / 150);
                let scaleOfSwipeInY = Math.round((event.deltaY) / 75);
                if (this.zoomed){
                    let zoomableArea = document.getElementById("area");
                    let zoomableAreaTranslateStyleText = zoomableArea.style.transform;

                    let currentYPosition = 0;
                    let currentXPosition = 0;
                    if (zoomableAreaTranslateStyleText.indexOf('translateY(') != -1){
                        let translateYText = (zoomableAreaTranslateStyleText.split('translateY(')[1]).split('px)')[0];
                        currentYPosition = parseFloat(translateYText);
                    }
                    if (zoomableAreaTranslateStyleText.indexOf('translateX(') != -1){
                        let translateXText = (zoomableAreaTranslateStyleText.split('translateX(')[1]).split('px)')[0];
                        currentXPosition = parseFloat(translateXText);
                    }

                    let scaleText = (zoomableAreaTranslateStyleText.split('scale(')[1]).split(')')[0];
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

                    zoomableArea.setAttribute("style","transform:translateX("+ NewXPosition +"px) scale("+ currentScale +") translateY(" + NewYPosition +"px)");
                }
                
            },
        },
        mounted() {
            let pngImage = document.getElementById('png-image');
             
            // panzoom
            $('#container_zoom').pinchzoomer();

            // var $panzoom = $('#area').panzoom({
            //     contain: 'invert'
            // });

            // $panzoom.parent().on('mousewheel.focal', ( e ) => {
            //     e.preventDefault();
            //     var delta = e.delta || e.originalEvent.wheelDelta;
            //      var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            //      $panzoom.panzoom('zoom', zoomOut, {
            //          increment: 0.1,
            //          animate: false,
            //          panOnlyWhenZoomed: true,
            //          minScale: 1,
            //          focal:e
            //      });
            //  });

            // querySelector('#svg-container').addEventListener('click', function () {
            //     this.svgPressed($event)
            // });
            // $('#svg-container').click(function(){ this.svgPressed(event)});

            pngImage.addEventListener('load', () => {
                // add query here
                if(soldOutCommunities.filter( (soldOut) => soldOut.id === this.neighbourhood ).length === 0) {
                    let query = 'api=eq.' + this.community;
                    if(this.community === 'almouj') {
                        query += '&property_name=eq.' + communityPositions[this.community][this.neighbourhood]['api_name']
                    }
                    this.getData(query).then( (res) => {
                        this.data = res.data;
                        if(this.community === 'waterfrontcity') {
                            this.data = this.data.map( (item) => {
                                item.id = item.id.replace(/\s/g, '');
                                item.aspect = item.plot_number;
                                item.images = galleryMapping[this.community][this.neighbourhood][item.unit_type] && galleryMapping[this.community][this.neighbourhood][item.unit_type][item.aspect] ? galleryMapping[this.community][this.neighbourhood][item.unit_type][item.aspect] : '';
                                return item;
                            });
                        }
                        if(this.community === 'tilalalghaf') {
                            this.data = this.data.map( (item) => {
                                //item.id = item.id.replace(/\-/g, '.');
                                item.aspect = item.aspect ? item.aspect : 'general';
                                item.images = galleryMapping[this.community][this.neighbourhood][item.unit_type]
                                return item;
                            });

                        }
                        this.data = this.data.map( (item) => {
                            item.aspect = item.aspect ? item.aspect : 'general';
                            return item;
                        });

                        this.pngContainerScale = {'transform': 'scale(' + (window.innerWidth / pngImage.width) + ')' };

                        let svgImage = document.getElementById('svg-image');
                        this.svgContainerScale = {'transform': 'scale(' + (window.innerWidth / svgImage.width.baseVal.value) + ')' };

                        let svgTransformData = communityPositions[this.community][this.neighbourhood].svg;
                        this.svgTransform = {
                            'transform': 'scale(' + svgTransformData.scale + ') translate(' + svgTransformData.translate[0] + 'px ,' + svgTransformData.translate[1] + 'px ) rotate(' + svgTransformData.rotate + 'deg)'
                        };

                        let plotBoundaryContainer = communityPositions[this.community][this.neighbourhood].plot_boundary;
                        let plotBoundaries = Array.from(document.getElementById(plotBoundaryContainer).children);
                        for(let index = 0; index < plotBoundaries.length; index++) {
                            let dataItem = this.data.filter( (item) => {
                                if(this.community === 'almouj') {
                                    plotBoundaries[index].id = plotBoundaries[index].id.split('_')[0];
                                }
                                return plotBoundaries[index].id === item.id;
                            })[0];

                            if(dataItem) {
                                

                                let type = Object.keys(config.houseTypes).filter( (houseType) => config.houseTypes[houseType].indexOf(dataItem.type) !== -1)[0];

                                let beds = dataItem.bedrooms.replace(/\D/g, '');
                                let propertyType = type + beds;

                                //Townhouse 4 bedroom from tilalalghaf removed here
                                if(this.community === 'tilalalghaf' && beds == 4 && dataItem.type === "Town house"){
                                    console.log("Here");
                                    continue;
                                }

                                if(beds && propertyType) {
                                    plotBoundaries[index].classList.add('svg-house-icon');
                                    plotBoundaries[index].classList.add('type_' + propertyType);
                                    this.propertyList = Array.from(new Set([...this.propertyList, propertyType])).sort();

                                    let availability = config.availablityMap.available.indexOf(dataItem.availability) !== -1 ? 'available' : 'unavailable';
                                    plotBoundaries[index].classList.add(availability);
                                }
                            }
                        }
                        this.loaded = true;

                    }, (err) => {
                        console.log('unable to get data', err);
                    } )

                } else {
                    this.pngContainerScale = {'transform': 'scale(' + (window.innerWidth / pngImage.width) + ')' };
                    this.loaded = true;
                    this.soldOutDetails = soldOutCommunities.filter( (soldOut) => soldOut.id === this.neighbourhood )[0];
                }

            })
        },
        watch: {
            amenitiesFilter: function(val) {
                if(val) {
                    communityPositions[this.community][this.neighbourhood].amenities.forEach( (amenity) => {
                        document.getElementById(amenity).classList.add('amenity-active');
                    });
                } else {
                    communityPositions[this.community][this.neighbourhood].amenities.forEach( (amenity) => {
                        document.getElementById(amenity).classList.remove('amenity-active');
                    });
                }
            }
        }
    });
</script>

<template>

<div class="app">
    <AppHeader :logo="community" back="true" v-on:back="backToOverview" />
    
        <div class="container" :class="{'blur': soldOutDetails}" id="container_zoom">
            <div id="area" :class="{ 'visible': loaded, 'one-community': this.oneFilterCommunity }">
                <div id="image_area">
                    <div id="png-container" :style="pngContainerScale" :class="{ 'filters' : filterPng }">
                        <img :src="images[community][neighbourhood]" class="png-image" id="png-image" />
                    </div>

                    <v-touch v-on:pinchout="locationImageContainerZoomIn" v-on:pinchin="locationImageContainerZoomOut" v-on:tap="svgPressed($event)" v-on:pan="locationImageContainerPan($event)" v-bind:pan-options="{ direction: 'all', threshold: 10 }">
                    <div id="svg-container" :style="svgContainerScale" :class="propertyTypeFilter" @click="svgPressed($event)">
                        <AlZahia v-if="community === 'alzahia'" class="svg-image" id="svg-image" :style="svgTransform" />
                        <AlMouj v-if="community === 'almouj'" class="svg-image" id="svg-image" :style="svgTransform" />
                        <WaterfrontCity v-if="community === 'waterfrontcity'" class="svg-image thinner-outlines" id="svg-image" :style="svgTransform" />
                        <TilalAlGhaf v-if="community === 'tilalalghaf'" class="svg-image" id="svg-image" :style="svgTransform" />
                    </div>
                    </v-touch>
                </div>
            </div>
            <PropertyFilter class="prop-filter" :class="{'visible': !soldOutDetails && loaded}" :propertyTypeList="propertyList" :propertyTypeFilter="propertyTypeFilter" :amenitiesFilter="amenitiesFilter" v-on:setPropertyTypeFilter="setPropertyTypeFilter" v-on:setAmenitiesFilter="setAmenitiesFilter" />
            <PropertyInfo v-if="propertyInfoActive" :property="activeProperty" v-on:close="closePropertyInfo" />
        </div>
    
    <div class="sold-out" v-if="soldOutDetails">
        <div class="sold-out-content" id="sold-out">
            <h2 class="sold-out-title">{{ soldOutDetails.title }}</h2>
            <div class="sold-out-row">
                <p class="sold-out-text" v-html="soldOutDetails.text"></p>
                
                <div class="sold-out-image-container">
                    <v-touch v-on:pinchout="soldOutContainerZoomIn" v-on:pinchin="soldOutContainerZoomOut">
                        <img v-if="!table" class="sold-out-image" :src="soldOutDetails.image" />
                        <img v-if="table" class="sold-out-image" :src="soldOutDetails['image-local']" />
                        <span class="sold-out-image-text">{{ soldOutDetails['image-text'] }}</span>
                    </v-touch>
                </div>
                
            </div>
            <button class="sold-out-button" @click="backToOverview()">Back to the Masterplan</button>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
    margin-top: 8rem;
    &.blur {
        filter: blur(0.5rem);
    }
}

.prop-filter {
    opacity: 0;
    &.visible {
        opacity: 1;
    }
}

#area {
    width: 75%;
    height: 100%;
    position: relative;
    opacity: 0;
}

#svg-container {
    position: absolute;
    left: 0;
    top: -8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-origin: 0px 0px 0px;
}

#png-container {
    position: absolute;
    left: 0;
    top: -8rem;
    overflow: hidden;
    transform-origin: 0px 0px 0px;
    &.filters {
        #png-image {
            filter: grayscale(0.9);
            opacity: 0.6;
        }
    }
    #png-image {
        transition: filter 0.5s ease-out, opacity 0.5s ease-out;
    }
}

svg:not(:root) {
    overflow: visible !important;
}

.sold-out {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .sold-out-content {
        width: 70%;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        padding: 9rem 6rem 7rem;
        margin-top: 6rem;
        box-shadow: 0.25rem 0.25rem 1rem #cccccc;
    }
    .sold-out-title {
        font-size: 1.5rem;
        line-height: 3.5rem;
        letter-spacing: 0.025rem;
        border-bottom: 0.1rem solid #4A4A4A;
        margin: 0;
        font-weight: 200;
    }
    .sold-out-row {
        width: 100%;
        display: flex;
    }
    .sold-out-text {
        width: 42%;
        margin: 0;
        padding-right: 3rem;
        margin-top: 4.5rem;
        font-size: 1.2rem;
        letter-spacing: 0.025rem;
        line-height: 2.2rem;
        font-weight: 200;
    }
    .sold-out-image-container {
        width: 58%;
        position: relative;
        .sold-out-image {
            width: 100%;
            margin-top: 2rem;
            filter: brightness(66%);
        }
        .sold-out-image-text {
            position: absolute;
            line-height: 2rem;
            top: calc(50% - 1rem);
            left: 0;
            right: 0;
            color: #ffffff;
            text-align: center;
            font-size: 2.5rem;
            letter-spacing: 0.2rem;
        }
    }
    .sold-out-button {
        background-color: #8a1538;
        color: #ffffff;
        padding: 0.75rem 0;
        margin-top: 1rem;
        width: 18.1%;
        font-size: 1.15rem;
        font-weight: 200;
    }
}
</style>

<style lang="scss">
#area {
    opacity: 0;
    transition: opacity 0.75s ease;
    &.visible {
        opacity: 1;
    }
    &.one-community {
        .svg-house-icon {
            fill: none;
            &.unavailable {
                pointer-events: none;
            }
        }
    }
}

.svg-house-icon {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
    transition: fill 0.25s ease;
    &.unavailable {
        pointer-events: none;
    }
}
.thinner-outlines {
    .svg-house-icon {
        stroke-width: .25;
    }
}

.amenity-active {
    opacity: 1 !important;
}

.active_apartmentStudio {
    .type_apartmentStudio {
        &.available {
            fill: rgba(248,151,21,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(248,151,21,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_apartment1 {
    .type_apartment1 {
        &.available {
            fill: rgba(0,177,176,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(0,177,176,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_apartment2 {
    .type_apartment2 {
        &.available {
            fill: rgba(0,150,214,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(0,150,214,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_apartment3 {
    .type_apartment3 {
        &.available {
            fill: rgba(95,86,98,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(95,86,98,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_apartment4 {
    .type_apartment4 {
        &.available {
            fill: rgba(0,70,127,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(0,70,127,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_apartment5 {
    .type_apartment5 {
        &.available {
            fill: rgba(253,185,19,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(253,185,19,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_townhouse2 {
    .type_townhouse2 {
        &.available {
            fill: rgba(253,185,19,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(253,185,19,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_townhouse3 {
    .type_townhouse3 {
        &.available {
            fill: rgba(108,164,57,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(108,164,57,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_townhouse4 {
    .type_townhouse4 {
        &.available {
            fill: rgba(0,70,127,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(0,70,127,0.25) !important;
            stroke: #3C3C3D !important;
            z-index: -1;
        }
    }
}

.active_villa3 {
    .type_villa3 {
        &.available {
            fill: rgba(248,151,21,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(248,151,21,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_villa31 {
    .type_villa31 {
        &.available {
            fill: rgba(248,151,21,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(248,151,21,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_villa4 {
    .type_villa4 {
        &.available {
            fill: rgba(0,177,176,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(0,177,176,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_villa5 {
    .type_villa5 {
        &.available {
            fill: rgba(0,150,214,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(0,150,214,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_villa6 {
    .type_villa6 {
        &.available {
            fill: rgba(95,86,98,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(95,86,98,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_bungalow4 {
    .type_bungalow4 {
        &.available {
            fill: rgba(135,43,192,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(135,43,192,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}
.active_bungalow5 {
    .type_bungalow5 {
        &.available {
            fill: rgba(255,166,0,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(255,166,0,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}
.active_bungalow6 {
    .type_bungalow6 {
        &.available {
            fill: rgba(180,180,160,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(180,180,160,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_harmony_bungalow4 {
    .type_harmony_bungalow4 {
        &.available {
            fill: rgba(248, 151, 21, 0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(248, 151, 21, 0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}
.active_harmony_bungalow5 {
    .type_harmony_bungalow5 {
        &.available {
            fill: rgba(108, 164, 57, 0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(108, 164, 57, 0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}
.active_harmony_villa4 {
    .type_harmony_villa4 {
        &.available {
            fill: rgba(0, 177, 176, 0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(0, 177, 176,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}
.active_harmony_villa5 {
    .type_harmony_villa5 {
        &.available {
            fill: rgba(0, 150, 214, 0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(0, 150, 214, 0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}
.active_harmony_villa6 {
    .type_harmony_villa6 {
        &.available {
            fill: rgba(95, 96, 98, 0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(95, 96, 98,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}
.active_serenity_villa5 {
    .type_serenity_villa5 {
        &.available {
            fill: rgba(0, 150, 214,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(0, 150, 214,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}
.active_serenity_villa6 {
    .type_serenity_villa6 {
        &.available {
            fill: rgba(253, 185, 19, 0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(253, 185, 19, 0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

</style>
