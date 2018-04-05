<script>
import Vue from 'vue';
import GalleryMapping from '../../data/galleryMapping.js';
import axios from 'axios';

export default Vue.component('property-info-floorplan', {
    props: ['property'],
    data() {
        return {
            floorplan: GalleryMapping[this.$route.query.community][this.$route.query.neighbourhood][this.property.unit_type][this.property.aspect]
        }
    },
    methods: {
        backToSummary: function() {
            this.$emit('changeView', 'summary');
        }
    }
});
</script>

<template>
    <div class="info-floorplan">
        <h3 class="info-title">FLOORPLAN</h3>
        <div class="info-image-container">
            <img class="info-image" :src="floorplan" />
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
        .info-image {
            display: block;
            max-width: 100%;
            max-height: 60vh;
            width: 100%;
            height: 60vh;
            object-fit: contain;
            object-position: center;
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
