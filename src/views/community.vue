<script>
    import Vue from 'vue';
    import PropertyFilter from '../components/propertyFilter.vue';
    import PropertyInfo from '../components/propertyInfo.vue';

    import AlZahia from '../images/masterplans/al_zahia_masterplan.svg';

    export default Vue.component('community', {
        components: {
            PropertyFilter,
            PropertyInfo,
            AlZahia
        },
        data() {
            return {
                propertyTypeFilter: {},
                amenitiesFilter: false,
                propertyInfoActive: false,
                activeProperty: null,
                pngContainerScale: null,
                svgContainerScale: null,
                pngTransform: null,
                svgTransform: null,
                images: {
                    alZahia: require('../images/masterplans/al_zahia_background.png')
                },
                propertyList: ['3V', '4V', '5V', '6V', '2TH', '3TH', '4TH'],
                availableList: ['unavailable', 'available'],
                dataPoints: {
                    alZahia: {
                        alLilac: {
                            'plot_boundary': 'AL_ZAHIA_PLOT_BOUNDARIES',
                            'png': {
                                'scale': 2.2,
                                'translate': [-150, 438]
                            },
                            'svg': {
                                'scale': 4.975,
                                'translate': [761, 331]
                            }
                        }
                    }
                }
            }
        },
        computed: {
            filterPng: function() {
                return Object.keys(this.propertyTypeFilter).filter( (key) => this.propertyTypeFilter[key] ).length;
            }
        },
        methods: {
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
                    let dummyData = {
                        'id': elementPressed.id,
                        'bedrooms': 3,
                        'bathrooms': 2,
                        'livingrooms': 3,
                        'garages': 1,
                        'plot_number': 111,
                        'unit_type': '3V',
                        'type': 'Villa',
                        'builtup_area': 2000,
                        'plot_area': 2500,
                        'availability': true,
                        'price': 1300000
                    }
                    // id bedrooms bathrooms livingrooms garages plot_number unit_type
       // type builtup_area plot_area availability price

                    this.openPropertyInfo(dummyData);
                }
            }
        },
        mounted() {
            /********
                API DATA STRUCTURE
                id bedrooms bathrooms livingrooms garages plot_number unit_type
   type builtup_area plot_area availability price
            ********/
            window.setTimeout( () => {
                let area = document.getElementById('area');

                let pngImage = document.getElementById('png-image');
                this.pngContainerScale = {'transform': 'scale(' + (area.clientWidth / pngImage.width) + ')' };

                let svgImage = document.getElementById('svg-image');
                this.svgContainerScale = {'transform': 'scale(' + (area.clientWidth / svgImage.width.baseVal.value) + ')' };

                let pngTransformData = this.dataPoints.alZahia.alLilac.png;
                this.pngTransform = {
                    'transform': 'scale(' + pngTransformData.scale + ') translate(' + pngTransformData.translate[0] + 'px ,' + pngTransformData.translate[1] + 'px )'
                };

                let svgTransformData = this.dataPoints.alZahia.alLilac.svg;
                this.svgTransform = {
                    'transform': 'scale(' + svgTransformData.scale + ') translate(' + svgTransformData.translate[0] + 'px ,' + svgTransformData.translate[1] + 'px )'
                };

                let plotBoundaryContainer = this.dataPoints.alZahia.alLilac.plot_boundary;
                let plotBoundaries = Array.from(document.getElementById(plotBoundaryContainer).children);
                for(let index = 0; index < plotBoundaries.length; index++) {
                    let dummyType = Math.floor(Math.random() * this.propertyList.length);
                    let dummyAvailable = Math.floor(Math.random() * this.availableList.length);
                    // plotBoundaries[index].classList.add(this.data[plotBoundaries[index].available])
                    plotBoundaries[index].classList.add('type_' + this.propertyList[dummyType]);
                    // plotBoundaries[index].classList.add(this.data[plotBoundaries[index].unit_type])
                    plotBoundaries[index].classList.add(this.availableList[dummyAvailable]);
                }

            }, 2500 );
        }
    });
</script>

<template>
<div class="container">
    <div id="area">
        <div id="png-container" :style="pngContainerScale" :class="{ 'filters' : filterPng }">
            <img :src="images.alZahia" class="png-image" id="png-image" :style="pngTransform" />
        </div>
        <div id="svg-container" :style="svgContainerScale" :class="propertyTypeFilter" @click="svgPressed($event)">
            <AlZahia class="svg-image" id="svg-image" :style="svgTransform" />
        </div>
    </div>
    <!-- <p>Property Type Filter: {{ propertyTypeFilter }}</p>
    <p>Amenities Filter: {{ amenitiesFilter }}</p>
    <button @click="openPropertyInfo()" type="button">Open Property Info</button> -->

    <PropertyFilter :propertyTypeFilter="propertyTypeFilter" :amenitiesFilter="amenitiesFilter" v-on:setPropertyTypeFilter="setPropertyTypeFilter" v-on:setAmenitiesFilter="setAmenitiesFilter" />
    <PropertyInfo v-if="propertyInfoActive" :property="activeProperty" v-on:close="closePropertyInfo" />
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
}

#svg-container {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-origin: 0px 0px 0px;
}

#png-container {
    position: absolute;
    left: 0;
    top: 0;
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
.type_3V {
    display: block !important;
    fill: none;
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
    fill: none;
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
            // stroke-width: 2;
            fill: rgba(251,184,49, 0.25) !important;
            stroke: #3C3C3D !important;
        }
    }
}

.type_5V {
    display: block !important;
    fill: none;
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
    fill: none;
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
    fill: none;
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
    fill: none;
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
    fill: none;
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

.st0, .st1, .st2, .st3, .st4, .st5, .st6, .st7, .st8, .st9, .st10, .st11, .st12, .st13, .st14, .st15, .st16 {
    display: none;
}
</style>
