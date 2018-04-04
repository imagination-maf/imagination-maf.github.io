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
            getComposedPath: function(el) {
                // Chrome is the only browser that has click event path
                // Polyfill for Chrome's path or rather the composedPath standard
                var path = [];
                while (el) {
                    path.push(el);
                    if (el.tagName === 'HTML') {
                        path.push(document);
                        path.push(window);
                        return path;
                    }
                    el = el.parentElement;
                }
                return path;
            },
            svgPressed: function($event) {
                // Polyfill path if not on Chrome
                let pathElements = $event.path;
                if (!pathElements) pathElements = this.getComposedPath($event.target);
                let path = pathElements[0].id;
                let splitPath = path.split('_x5F_');
                if(splitPath[splitPath.length - 1] === 'tap'){
                    let neighbourhood = splitPath[0].replace(/_/g, '').toLowerCase();
                    this.$router.push({ path: 'community', query: { 'community': this.$route.query.community, 'neighbourhood': neighbourhood } });
                }
            }
        },
        mounted() {
            let svgImage = document.getElementById('svg');
            this.svgScale = {'transform': 'scale(' + (window.innerWidth / svgImage.width.baseVal.value) + ')' };
        }
    });
</script>

<template>
<div class="app">
    <AppHeader :logo="selectedCommunity" v-on:back="backToMap" back="true" />
    <transition name="page" appear>
        <div class="container" @mousedown="svgPressed($event)">
            <img class="image" :src="images[selectedCommunity]" />
            <AlZahia id="svg" ng-if="selectedCommunity === 'alzahia'" :style="[svgScale]" />
        </div>
    </transition>
</div>
</template>

<style lang="scss">
#Tap_area {
    path,
    polygon {
        fill: rgba(0,0,0,0);
    }
}
</style>

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
