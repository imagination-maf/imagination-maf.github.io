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
                svgTransform: null,
                images: {
                    alZahia: require('../images/masterplans/al_zahia_background.png')
                }
            }
        },
        computed : {

        },
        methods: {
            setPropertyTypeFilter: function(key) {
                Vue.set(this.propertyTypeFilter, key, !this.propertyTypeFilter[key]);
            },
            setAmenitiesFilter: function() {
                this.amenitiesFilter = !this.amenitiesFilter;
            },
            openPropertyInfo: function() {
                this.propertyInfoActive = true;
            },
            closePropertyInfo: function() {
                this.propertyInfoActive = false;
            }
        },
        mounted() {
            let svgImage = document.getElementById('svg-image');
            let scaleX = window.innerWidth / svgImage.width.baseVal.value;
            let scaleY = window.innerHeight / svgImage.height.baseVal.value;

            let scale = (scaleX < scaleY) ? scaleX : scaleY;
            this.svgTransform = {
                'transform': 'scale(' + scale + ')',
                'transform-origin': '0px 0px 0px'
            };
        }
    });
</script>

<template>
<div class="container">
    <img :src="images.alZahia" class="png-image" />
    <AlZahia class="svg-image" id="svg-image" :style="svgTransform" />

    <h3>Community Pageee</h3>
    <p>Property Type Filter: {{ propertyTypeFilter }}</p>
    <p>Amenities Filter: {{ amenitiesFilter }}</p>
    <button @click="openPropertyInfo()" type="button">Open Property Info</button>

    <PropertyFilter :propertyTypeFilter="propertyTypeFilter" :amenitiesFilter="amenitiesFilter" v-on:setPropertyTypeFilter="setPropertyTypeFilter" v-on:setAmenitiesFilter="setAmenitiesFilter" />
    <PropertyInfo v-if="propertyInfoActive" v-on:close="closePropertyInfo" />
</div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.svg-image {
    position: absolute;
    left: 0;
    top: 0;
}

.png-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

svg:not(:root) {
    overflow: visible !important;
}
</style>

<style>
.st0{fill:none;stroke:#989898;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:3,3,3,3;}

.st1{fill:none;stroke:#989898;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:3,3,3,3,0,0;}
.st2{fill:none;stroke:#989898;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}

.st3{fill:none;stroke:#989898;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:8.1535,4.0768;}

.st4{fill:none;stroke:#989898;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:20.3838,10.1919;}
.st5{fill:#808080;stroke:#989898;stroke-width:0.25;stroke-miterlimit:10;}
.st6{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#989898;stroke-width:0.25;stroke-miterlimit:10;}
.st7{fill-rule:evenodd;clip-rule:evenodd;fill:#EDECE8;stroke:#989898;stroke-width:0.25;stroke-miterlimit:10;}
.st8{display:none;}
.st9{display:inline;}

.st10{fill:none;stroke:#989898;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:4.588931e-02,4.588931e-02;}
.st11{fill-rule:evenodd;clip-rule:evenodd;fill:#808080;stroke:#989898;stroke-width:0.25;stroke-miterlimit:10;}
.st12{fill:#BF00FF;}
.st13{font-family:'ArialMT';}
.st14{font-size:2.7639px;}
</style>
