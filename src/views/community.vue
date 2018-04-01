<script>
    import Vue from 'vue';
    import AppHeader from '../components/header.vue';
    import PropertyFilter from '../components/propertyFilter.vue';
    import PropertyInfo from '../components/propertyInfo.vue';

    import AlZahia from '../images/masterplans/al_zahia_masterplan.svg';
    import axios from 'axios';
    import config from '../data/config.js';

    export default Vue.component('community', {
        components: {
            AppHeader,
            PropertyFilter,
            PropertyInfo,
            AlZahia
        },
        data() {
            return {
                loaded: false,
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
                    }
                },
                propertyList: [],
                availableList: [],
                data: null
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
            backToOverview: function() {
                this.$router.push({ path: 'overview', query: {community: this.community} });
            },
            setPropertyTypeFilter: function(key) {
                Vue.set(this.propertyTypeFilter, key, !this.propertyTypeFilter[key]);
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
                let elementPressed = $event.path[0];
                if(elementPressed.id){
                    let plotId = elementPressed.id.split('_').filter( (part) => part.length);
                    let plotNumber = plotId[plotId.length - 1];
                    let plotInfo = this.data.filter( (item) => plotNumber === item.id)[0];
                    if(plotInfo) this.openPropertyInfo(plotInfo);
                }
            },
            getData: function(query) {
                let url = query ? config.url[config.mode] + 'maf_plot?' + query : config.url[config.mode] + 'maf_plot';
                return axios({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Authorization': 'Basic ' + btoa('maf:25st0rest')
                    }
                })
            }
        },
        mounted() {
            let pngImage = document.getElementById('png-image');
            pngImage.addEventListener('load', () => {
                // add query here
                let query = 'api=eq.' + this.community;
                this.getData(query).then( (res) => {
                    this.data = res.data;

                    let typesss = {};
                    this.data.map( (item) => {
                        if(item.id.split('-')[1] === '4') {
                            console.log('aspect', item,  item.aspect);
                            if(!typesss[item.unit_type]) {
                                typesss[item.unit_type] = []
                            }

                            typesss[item.unit_type].push(item.aspect);

                            return true;
                        }
                    } )
                    console.log(typesss);

                    let final = {};
                    for (var property in typesss) {
                        if (typesss.hasOwnProperty(property)) {
                            // do stuff
                            final[property] = new Set(typesss[property]);
                        }
                    }

                    console.log('finallll', final);

                    this.pngContainerScale = {'transform': 'scale(' + (window.innerWidth / pngImage.width) + ')' };

                    let svgImage = document.getElementById('svg-image');
                    this.svgContainerScale = {'transform': 'scale(' + (window.innerWidth / svgImage.width.baseVal.value) + ')' };

                    let svgTransformData = config.dataPoints[this.community][this.neighbourhood].svg;
                    this.svgTransform = {
                        'transform': 'scale(' + svgTransformData.scale + ') translate(' + svgTransformData.translate[0] + 'px ,' + svgTransformData.translate[1] + 'px )'
                    };

                    let types = [];

                    let plotBoundaryContainer = config.dataPoints[this.community][this.neighbourhood].plot_boundary;
                    let plotBoundaries = Array.from(document.getElementById(plotBoundaryContainer).children);
                    for(let index = 0; index < plotBoundaries.length; index++) {
                        let dataItem = this.data.filter( (item) => {
                            let plotId = plotBoundaries[index].id.split('_').filter( (part) => part.length);
                            return plotId[plotId.length - 1] === item.id;
                        })[0];

                        if(dataItem) {
                            let type = Object.keys(config.houseTypes).filter( (houseType) => config.houseTypes[houseType].indexOf(dataItem.type) !== -1)[0];

                            // Debug code to find un included types
                            if(!type) {
                                console.log('item', dataItem);
                            }
                            let beds = dataItem.bedrooms;
                            let propertyType = type + beds;
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
            })
        },
        watch: {
            amenitiesFilter: function(val) {
                if(val) {
                    config.dataPoints[this.community][this.neighbourhood].amenities.forEach( (amenity) => {
                        document.getElementById(amenity).classList.add('amenity-active');
                    });
                } else {
                    config.dataPoints[this.community][this.neighbourhood].amenities.forEach( (amenity) => {
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
    <div class="container">
        <div id="area" v-bind:class="{ visible: loaded }">
            <div id="png-container" :style="pngContainerScale" :class="{ 'filters' : filterPng }">
                <img :src="images[community][neighbourhood]" class="png-image" id="png-image" />
            </div>
            <div id="svg-container" :style="svgContainerScale" :class="propertyTypeFilter" @click="svgPressed($event)">
                <AlZahia ng-if="community === 'alzahia'" class="svg-image" id="svg-image" :style="svgTransform" />
            </div>
        </div>
        <PropertyFilter :propertyTypeList="propertyList" :propertyTypeFilter="propertyTypeFilter" :amenitiesFilter="amenitiesFilter" v-on:setPropertyTypeFilter="setPropertyTypeFilter" v-on:setAmenitiesFilter="setAmenitiesFilter" />
        <PropertyInfo v-if="propertyInfoActive" :property="activeProperty" v-on:close="closePropertyInfo" />
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
</style>

<style lang="scss">
.svg-house-icon {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
    transition: fill 0.25s ease;
}

.amenity-active {
    fill: rgba(238, 225, 20, 0.75) !important;
}

.active_apartmentStudio {
    .type_apartmentStudio {
        &.available {
            fill: rgba(246,150,46,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(246,150,46,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_villa3 {
    .type_villa3 {
        &.available {
            fill: rgba(246,150,46,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(246,150,46,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_apartment1 {
    .type_apartment1 {
        &.available {
            fill: rgba(251,184,49,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(251,184,49,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_villa4 {
    .type_villa4 {
        &.available {
            fill: rgba(251,184,49,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(251,184,49,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_apartment2 {
    .type_apartment2 {
        &.available {
            fill: rgba(28,177,175,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(28,177,175,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_villa5 {
    .type_villa5 {
        &.available {
            fill: rgba(28,177,175,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(28,177,175,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_apartment3 {
    .type_apartment3 {
        &.available {
            fill: rgba(95,96,98,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(95,96,98,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_villa6 {
    .type_villa6 {
        &.available {
            fill: rgba(95,96,98,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(95,96,98,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_townhouse2 {
    .type_townhouse2 {
        &.available {
            fill: rgba(109,163,64,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(109,163,64,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_townhouse3 {
    .type_townhouse3 {
        &.available {
            fill: rgba(24,151,212,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(24,151,212,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.active_townhouse4 {
    .type_townhouse4 {
        &.available {
            fill: rgba(7,71,125,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(7,71,125,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

// TODO CHANGE THIS
#area.visible {
    animation-name: fade-in;
    animation-fill-mode: both;
    animation-duration: .5s;
    animation-duration: 1s
}

@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

</style>
