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
            dummyClick: function(id) {
                this.$router.push({ path: 'community', query: { 'community': this.$route.query.community, 'neighbourhood': id } });
            }
        },
        mounted() {
            let svgImage = document.getElementById('svg');
            console.log( window.innerWidth, svgImage.width.baseVal.value, (window.innerWidth / svgImage.width.baseVal.value) );
            this.svgScale = {'transform': 'scale(' + (window.innerWidth / svgImage.width.baseVal.value) + ')' };
        }
    });
</script>

<template>
<div class="app">
    <AppHeader />
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
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
    .image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
    }
}
</style>
