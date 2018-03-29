<script>
    import Vue from 'vue';

    import AlZahia from '../images/overalls/overview-alzahia.svg';
    import config from '../data/config.js';
    import AppHeader from '../components/header.vue';

    export default Vue.component('overview', {
        components: {
            AppHeader,
            AlZahia
        },
        data() {
            return {
                svgScale: null,
                images: {
                    'alzahia': require('../images/overalls/overview-alzahia.png')
                }
            }
        },
        computed: {
            selectedCommunity: function() {
                return this.$route.query.community;
            }
        },
        methods: {
            backToMap: function() {
                let mapLocation = Object.keys(config.mappings).filter( (key) => config.mappings[key] === this.$route.query.community)[0];
                this.$router.push({ path: 'location', query: { 'view': mapLocation }});
            },
            dummyClick: function(id) {
                this.$router.push({ path: 'community', query: { 'community': this.$route.query.community, 'neighbourhood': id } });
            }
        },
        mounted() {
            let svgImage = document.getElementById('svg');
            console.log('svg image', svgImage, window.innerWidth);
            this.svgScale = {'transform': 'scale(' + (window.innerWidth / svgImage.width.baseVal.value) + ')' };
        }
    });
</script>

<template>
<div class="app">
    <AppHeader :logo="selectedCommunity" v-on:back="backToMap" back="true" />
    <div class="container">
        <img class="image" :src="images[selectedCommunity]" />

        <AlZahia id="svg" ng-if="selectedCommunity === 'alzahia'" :style="[svgScale]" />

        <div style="position: absolute; left: 0; bottom: 1rem">
            <button @click="dummyClick('allilac')">Al Lilac</button>
            <button @click="dummyClick('aljouri')">Al Jouri</button>
            <button @click="dummyClick('alnarjis')">Al Narjis</button>
            <button @click="dummyClick('gardenapts')">Garden Apartments</button>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.app {
    position: relative;
    overflow: hidden;
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        position: absolute;
        object-position: top;
        left: 0;
        top: 0;
    }
    #svg {
        position: absolute;
        left: 0;
        top: 0;
        transform-origin: 0 0;
    }
}
</style>
