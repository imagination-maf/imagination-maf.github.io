<script>
import Vue from 'vue';
import GalleryMapping from '../../data/galleryMapping.js';
import axios from 'axios';

export default Vue.component('property-info-floorplan', {
    props: ['property'],
    data() {
        return {
            floorplans: null,
            baseUrl: GalleryMapping[this.$route.query.community][this.$route.query.neighbourhood][this.property.unit_type] + 'floorplan/'
        }
    },
    methods: {
        backToSummary: function() {
            this.$emit('changeView', 'summary');
        },
        getPictureInfo: function() {
            return axios({
                method: 'GET',
                url: this.baseUrl + 'data.json'
            })
        }
    },
    mounted() {
        this.getPictureInfo().then( (response) => {
            this.floorplans = response.data[this.property.aspect];
        } )
    }
});
</script>

<template>
    <div class="info-floorplan">
        <h3 class="info-title">FLOORPLAN</h3>
        <div class="info-image-container">
            <img class="info-image" v-for="image in floorplans" :src="baseUrl + image" />
        </div>
        <button type="button" @click="backToSummary()">Go Back to Summary</button>
    </div>
</template>

<style lang="scss" scoped>
.info-floorplan {
    width: 100%;
    display: flex;
    flex-direction: column;
    .info-title {
        border-bottom: 0.1rem solid #d7d7d7;
        color: #626263;
    }
    .info-image-container {
        width: 80%;
        display: flex;
        justify-content: space-between;
        .info-image {
            display: block;
            max-width: 33%;
            max-height: 50vh;
            object-fit: contain;
            object-position: center;
        }
    }
}
</style>
