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
                    // TODO relook at this logic
                    let plotNumber = elementPressed.id.split('-').reverse()[0];
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
                    console.log('dataaa', this.data.map( (item) => item.id ));
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
                            if(!dataItem.bedrooms){
                                console.log(dataItem);
                            }

                            let type = dataItem.bedrooms;
                            plotBoundaries[index].classList.add('type_' + type);
                            this.propertyList = Array.from(new Set([...this.propertyList, type])).sort();

                            let availability = config.availablityMap.available.indexOf(dataItem.availability) !== -1 ? 'available' : 'unavailable';
                            plotBoundaries[index].classList.add(availability);

                            types = new Set([...types, dataItem.type]);
                            console.log(types);
                        }
                    }

                    this.loaded = true;

                }, (err) => {
                    console.log('unable to get data', err);
                } )
            })
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
        }
    }
    #png-image {
        transition: filter 0.5s ease-out;
    }
}

svg:not(:root) {
    overflow: visible !important;
}
</style>

<style lang="scss">
.type_ {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
    transition: fill 0.5s ease;
}
.active_ {
    .type_ {
        &.available {
            fill: rgba(255,0,255,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(255,0,255,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.type_Studio {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
    transition: fill 0.5s ease;
}
.active_Studio {
    .type_Studio {
        &.available {
            fill: rgba(0,0,255,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(0,0,255,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.type_1 {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
    transition: fill 0.5s ease;
}
.active_1 {
    .type_1 {
        &.available {
            fill: rgba(255,0,0,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(255,0,0,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.type_2 {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
    transition: fill 0.5s ease;
}
.active_2 {
    .type_2 {
        &.available {
            fill: rgba(0,255,0,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(0,255,0,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.type_3 {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
    transition: fill 0.5s ease;
}
.active_3 {
    .type_3 {
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

.type_4 {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
}
.active_4 {
    .type_4 {
        &.available {
            fill: rgba(251,184,49, 0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(251,184,49, 0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.type_5 {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
}
.active_5 {
    .type_5 {
        &.available {
            fill: rgba(27,177,175,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(27,177,175,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}
.active_6 {
    .type_6 {
        &.available {
            fill: rgba(27,177,175,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(27,177,175,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}


.type_3V {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
    transition: fill 0.5s ease;
}
.active_3V {
    .type_3V {
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

.type_4V {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
}
.active_4V {
    .type_4V {
        &.available {
            fill: rgba(251,184,49, 0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            fill: rgba(251,184,49, 0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.type_5V {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
}
.active_5V {
    .type_5V {
        &.available {
            fill: rgba(27,177,175,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            // stroke-width: 2;
            fill: rgba(27,177,175,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.type_6V {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
}
.active_6V {
    .type_6V {
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

.type_2TH {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
}
.active_2TH {
    .type_2TH {
        &.available {
            fill: rgba(110,163,64,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            // stroke-width: 2;
            fill: rgba(110,163,64,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.type_3TH {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
}
.active_3TH {
    .type_3TH {
        &.available {
            fill: rgba(24,151,210,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            // stroke-width: 2;
            fill: rgba(24,151,210,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.type_4TH {
    display: block !important;
    fill: rgba(0,0,0,0);
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke: none;
    stroke-width: 1;
    stroke-miterlimit: 10;
}
.active_3TH {
    .type_3TH {
        &.available {
            fill: rgba(7,71,125,0.9) !important;
            stroke: #3C3C3D !important;
        }
        &.unavailable {
            // stroke-width: 2;
            fill: rgba(7,71,125,0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

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
