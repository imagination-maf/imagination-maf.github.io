<script>
import Vue from 'vue';
import FloorplanMapping from '../../data/floorplanMapping.js';
import axios from 'axios';
import config from '../../data/config.js';

export default Vue.component('property-info-floorplan', {
    props: ['property'],
    data() {
        return {
            url: process.env.NODE_ENV === 'table' ? config.localUrl : config.galleryUrl,
            floorplan: FloorplanMapping[this.$route.query.community][this.$route.query.neighbourhood][this.property.unit_type][this.property.aspect],
            slide: 0
        }
    },
    methods: {
        changeSlide: function(dir) {
            this.slide = ((this.slide + dir) + this.floorplan.length) % this.floorplan.length;
        },
        changeToSlideNum: function(index) {
            this.slide = index;
        },
        backToSummary: function() {
            this.$emit('changeView', 'summary');
        },
        imageContainerZoomIn: function() {
            let imageContainer = document.getElementById("image-container");
            imageContainer.setAttribute("style","transform:scale(2)");
        },
        imageContainerZoomOut: function() {
            let imageContainer = document.getElementById("image-container");
            imageContainer.setAttribute("style","transform:scale(1)");
        },
    },
        mounted() {
            var $panzoom = $('#image-container').panzoom({
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
    <div class="info-floorplan">
        <h3 class="info-title">FLOORPLAN</h3>
        <v-touch v-on:pinchout="imageContainerZoomIn" v-on:pinchin="imageContainerZoomOut">
            <div class="info-image-container" id="image-container">
                <img v-for="(plan, i) in floorplan" v-if="i === slide" class="info-image" :src="url + plan" />
                <button v-if="floorplan.length > 1" class="arrow left" type="button" @click="changeSlide(-1)"></button>
                <button v-if="floorplan.length > 1" class="arrow right" type="button" @click="changeSlide(1)"></button>
            </div>
        </v-touch>
        <div class="pagination" v-if="floorplan.length > 1">
            <div v-for="(page, index) in floorplan" class="pagination-item" :class="{'active': index === slide}" @click="changeToSlideNum(index)"></div>
        </div>
        <button class="info-button" type="button" @click="backToSummary()">Go Back to Summary</button>
    </div>
</template>

<style lang="scss" scoped>
.info-floorplan {
    width: 100%;
    display: flex;
    flex-direction: column;
    .info-title {
        color: #626263;
        position: absolute;
        left: 4rem;
        top: 2rem;
        letter-spacing: 0.08rem;
        font-weight: 200;
        font-size: 1.5rem;
    }
    .info-image-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        position: relative;
        .info-image {
            display: block;
            max-width: 100%;
            max-height: 60vh;
            width: 100%;
            height: 60vh;
            object-fit: contain;
            object-position: center;
        }
        .arrow {
            width: 3rem;
            height: 3rem;
            position: absolute;
            top: calc(50% - 1.5rem);
            border-radius: 100%;
            outline: none;
            background-image: url('../../images/overlay/circle.png');
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            &.left {
                left: 2rem;
                transform: scaleX(-1);
            }
            &.right {
                right: 2rem;
            }
        }
    }
    .pagination {
        position: absolute;
        bottom: 3rem;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        .pagination-item {
            background-color: #ffffff;
            border: 0.1rem solid #8A1538;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 100%;
            margin: 0 0.5rem;
            &.active {
                border-color: #ffffff;
                background-color: #8A1538;
            }
        }
    }
    .info-button {
        position: absolute;
        bottom: 4rem;
        left: 4rem;
        margin-left: 0;
        background-color: transparent;
        border: none;
        color: #626263;
        letter-spacing: 0.05rem;
        font-size: 1rem;
        outline: none;
    }
}
</style>
