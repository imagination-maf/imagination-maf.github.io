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
                pngContainerScale: null,
                svgContainerScale: null,
                pngTransform: null,
                svgTransform: null,
                images: {
                    alZahia: require('../images/masterplans/al_zahia_background.png')
                },
                propertyList: ['3V', '4V', '5V', '6V', '2TH', '3TH', '4TH'],
                dataPoints: {
                    alZahia: {
                        alLilac: {
                            'container': 'AL_ZAHIA_PLOT_BOUNDARIES',
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
            /********
                API DATA STRUCTURE
                id bedrooms bathrooms livingrooms garages plot_number unit_type
   type builtup_area plot_area availability price
            ********/
            window.setTimeout( () => {
                let area = document.getElementById('area');

                let pngImage = document.getElementById('png-image');
                console.log('area', [area], area.clientWidth, (area.clientWidth / pngImage.width));
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

                let boundaryContainer = this.dataPoints.alZahia.alLilac.container;
                let children = Array.from(document.getElementById(boundaryContainer).children);
                for(let index = 0; index < children.length; index++) {
                    children[index].classList.add('type_' + this.propertyList[Math.floor(Math.random() * this.propertyList.length)]);
                }

            }, 1000 );
        }
    });
</script>

<template>
<div class="container">
    <div id="area">
        <div id="png-container" :style="pngContainerScale">
            <img :src="images.alZahia" class="png-image" id="png-image" :style="pngTransform" />
        </div>
        <div id="svg-container" :style="svgContainerScale">
            <AlZahia class="svg-image" id="svg-image" :style="svgTransform" />
        </div>
    </div>
    <!-- <p>Property Type Filter: {{ propertyTypeFilter }}</p>
    <p>Amenities Filter: {{ amenitiesFilter }}</p>
    <button @click="openPropertyInfo()" type="button">Open Property Info</button> -->

    <PropertyFilter :propertyTypeFilter="propertyTypeFilter" :amenitiesFilter="amenitiesFilter" v-on:setPropertyTypeFilter="setPropertyTypeFilter" v-on:setAmenitiesFilter="setAmenitiesFilter" />
    <PropertyInfo v-if="propertyInfoActive" v-on:close="closePropertyInfo" />
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
}

svg:not(:root) {
    overflow: visible !important;
}
</style>

<style>

.type_3V {
    display: block !important;
    fill: #f6962d !important;
}
.type_4V {
    display: block !important;
    fill: #fbb831 !important;
}
.type_5V {
    display: block !important;
    fill: #1bb1af !important;
}
.type_6V {
    display: block !important;
    fill: #5f6062 !important;
}
.type_2TH {
    display: block !important;
    fill: #6ea340 !important;
}
.type_3TH {
    display: block !important;
    fill: #1897d3 !important;
}
.type_4TH {
    display: block !important;
    fill: #07477d !important;
}
.st0{
    display: none;
    /* fill: none;
    stroke: #989898;
    stroke-width: 0.25;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 3,3,3,3; */
}
.st1{
    display: none;
    /* fill: none;
    stroke: #989898;
    stroke-width: 0.25;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 3,3,3,3,0,0; */
}
.st2{
    display: none;
    /* fill: none;
    stroke: #989898;
    stroke-width: 0.25;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10; */
}
.st3{
    display: none;
    /* fill: none;
    stroke: #989898;
    stroke-width: 0.25;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 8.1535,4.0768; */
}
.st4{
    display: none;
    /* fill: none;
    stroke: #989898;
    stroke-width: 0.25;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 20.3838,10.1919; */
}
.st5{
    display: none;
    /* fill: #808080;
    stroke: #989898;
    stroke-width: 0.25;
    stroke-miterlimit: 10; */
}
.st6{
    display: none;
    /* fill-rule: evenodd;
    clip-rule: evenodd;
    fill: #00FF00;
    stroke: #989898;
    stroke-width: 0.25;
    stroke-miterlimit: 10; */
}
.st7{
    display: none;
    /* fill-rule: evenodd;
    clip-rule: evenodd;
    fill: #FF0000;
    stroke: #989898;
    stroke-width: 0.25;
    stroke-miterlimit: 10; */
}
.st8{
    display: none;
}
.st9{
    display: none;
}
.st10{
    display: none;
    /* fill: #ff0000;
    stroke: #989898;
    stroke-width: 0.25;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 4.588931e-02,4.588931e-02; */
}
.st11{
    display: none;
}
.st12{
    /* fill:#BF00FF; */
    display: none;
}
.st13{
    /* font-family:'ArialMT'; */
    display: none;
}
.st14{
    /* font-size:2.7639px; */
    display: none;
}
</style>
