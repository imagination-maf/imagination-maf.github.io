<script>
    import Vue from 'vue';

    export default Vue.component('attractor', {
        data() {
            return {
                alZahiaLanding: require('../images/attractor/al-zahia/al-zahia.png'),
                waterfrontCityLanding: require('../images/attractor/waterfront-city/waterfront-city.png'),
                tilalAlGhafLanding: require('../images/attractor/tilal-al-ghaf/tilal-al-ghaf.png'),
                alMoujMuscatLanding: require('../images/attractor/al-mouj-muscat/al-mouj-muscat.png')
            }
        },
        methods: {
            navigateToLocation: function(community) {
                this.$router.push({ path: 'location', query: { view: community}});
            }
        },
    });
</script>

<template>
    <div class="attractor">
        <div class="attractor-item" @click="navigateToLocation('app_x5F_city1--parent')">
            <img :src="alZahiaLanding" class="attractor-item-image" />
        </div>
        <div class="attractor-item" @click="navigateToLocation('app_x5F_city2--parent')">
            <img :src="waterfrontCityLanding" class="attractor-item-image" />
        </div>
        <div class="attractor-item" @click="navigateToLocation('app_x5F_city3--parent')">
            <img :src="tilalAlGhafLanding" class="attractor-item-image" />
        </div>
        <div class="attractor-item" @click="navigateToLocation('app_x5F_city3--parent')">
            <img :src="alMoujMuscatLanding" class="attractor-item-image" />
        </div>
    </div>
</template>

<style lang="scss" scope>
.attractor {
    width: 100%;
    height: 100%;
    display: flex;
    .attractor-item {
        flex: 1;
        .attractor-item-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
}
</style>
