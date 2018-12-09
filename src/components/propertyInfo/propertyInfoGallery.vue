<script>
import Vue from 'vue';
import config from '../../data/config.js';

export default Vue.component('property-info-gallery', {
    props: ['property'],
    data() {
        return {
            slide: 0
        }
    },
    computed: {
        images: function() {
            let images = this.property.images.split(';');
            if(images.length > 0) {
                let locationUrl = process.env.NODE_ENV === 'table' ? config.localUrl : config.galleryUrl;
                let url = locationUrl + this.$route.query.community + '/gallery/';

                // due to inconsisency in paths having extension, remove on all and re-add
                return images.map( (img) => url + img.replace(/ /g, '_').replace(/.jpg/g, '') + '.jpg' );
            } else {
                return null;
            }
        }
    },
    methods: {
        changeSlide: function(dir) {
            this.slide = ((this.slide + dir) + this.images.length) % this.images.length;
        },
        backToSummary: function() {
            this.$emit('changeView', 'summary');
        }
    }
});
</script>

<template>
    <div class="info-gallery">
        <div class="info-gallery-container">
            <img class="gallery-image" v-for="(image, index) in images" v-if="slide === index" :src="image" />
            <button class="arrow left" type="button" @click="changeSlide(-1)"></button>
            <button class="arrow right" type="button" @click="changeSlide(1)"></button>
            <div class="pagination">
                <div v-for="(page, index) in images" class="pagination-item" :class="{'active': index === slide}" @click="changeToSlideNum(index)"></div>
            </div>
        </div>
        <button class="info-button" type="button" @click="backToSummary()">Go Back to Summary</button>
    </div>
</template>

<style lang="scss" scoped>
.info-content {
    padding: 0 !important;
}
.info-gallery-container {
    width: 100%;
    position: relative;
    min-height: 64vh;
    .gallery-image {
        width: 100%;
    }
}
.info-gallery {
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

    .info-button {
        padding: 1rem 0 2rem;
        margin-left: 4rem;
        background-color: transparent;
        border: none;
        color: #626263;
        letter-spacing: 0.05rem;
        font-size: 1rem;
        outline: none;
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
</style>
