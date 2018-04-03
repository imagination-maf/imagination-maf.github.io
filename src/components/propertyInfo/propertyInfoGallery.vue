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
                let url = config.galleryUrl + this.$route.query.community + '/gallery/';

                // due to inconsisency in paths having extension, remove on all and re-add
                return images.map( (img) => url + img.replace('.jpg', '') + '.jpg' );
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
        <h3 class="info-title">Photo Gallery</h3>
        <div class="info-gallery-container">
            <img v-for="(image, index) in images" v-if="slide === index" style="width: 100%;" :src="image" />
            <button class="arrow left" type="button" @click="changeSlide(-1)"><</button>
            <button class="arrow right" type="button" @click="changeSlide(1)">></button>
        </div>
        <button class="info-button" type="button" @click="backToSummary()">Go Back to Summary</button>
    </div>
</template>

<style lang="scss" scoped>

.info-content {
    padding: 10rem 3rem 10rem 6rem !important;
}

.info-gallery-container {
    width: 100%;
    max-height: 60vh;
    .gallery-image {
        width: 100%;
        object-fit: contain;
        object-position: center;
    }
}
.info-gallery {
    .info-title {
        color: #626263;
        position: absolute;
        left: 4rem;
        top: 2rem;
        letter-spacing: 0.08rem;
        font-weight: 200;
        font-size: 1.5rem;
    }

    .arrow {
        background-color: #8a1337;
        color: #ffffff;
        width: 3rem;
        height: 3rem;
        position: absolute;
        top: calc(50% - 1.5rem);
        border-radius: 100%;
        &.left {
            left: 2rem;
        }
        &.right {
            right: 2rem;
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
