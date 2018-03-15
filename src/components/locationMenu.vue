<script>
import Vue from 'vue';

export default Vue.component('location-menu', {
    data() {
        return {
            interval: null,
            slideshowStatus: {
                'status': 'odd',
                'odd': true,
                'even': true
            },
            images: {
                alZahiaLandingPrimary: require('../images/attractor/al-zahia/al-zahia-primary.png'),
                alZahiaLandingSecondary: require('../images/attractor/al-zahia/al-zahia-secondary.png'),
                waterfrontCityLandingPrimary: require('../images/attractor/waterfront-city/waterfront-city-primary.png'),
                waterfrontCityLandingSecondary: require('../images/attractor/waterfront-city/waterfront-city-secondary.png'),
                tilalAlGhafLandingPrimary: require('../images/attractor/tilal-al-ghaf/tilal-al-ghaf-primary.png'),
                tilalAlGhafLandingSecondary: require('../images/attractor/tilal-al-ghaf/tilal-al-ghaf-secondary.png'),
                alMoujMuscatLandingPrimary: require('../images/attractor/al-mouj-muscat/al-mouj-muscat-primary.png'),
                alMoujMuscatLandingSecondary: require('../images/attractor/al-mouj-muscat/al-mouj-muscat-secondary.png')
            }
        }
    },
    methods: {
        navigateToLocation: function(community) {
            this.$router.push({ path: 'location', query: { view: community}});
        }
    },
    mounted() {
        this.interval = window.setInterval( () => {
            this.slideshowStatus[this.slideshowStatus.status] = !this.slideshowStatus[this.slideshowStatus.status];

            this.slideshowStatus.status = this.slideshowStatus.status === 'odd' ? 'even' : 'odd';
        }, 2000);
    },
    beforeDestroy() {
        window.clearInterval(this.interval);
        this.interval = null;
        delete this.interval;
    }
});
</script>

<template>
<div class="location-menu">
    <div class="location-menu-item" @click="navigateToLocation('app_x5F_world--parent')">
        <transition name="fade">
            <img v-show="slideshowStatus.odd === true" :src="images.alZahiaLandingPrimary" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.odd === false" :src="images.alZahiaLandingSecondary" class="location-menu-item-image" />
        </transition>
    </div>
    <div class="location-menu-item" @click="navigateToLocation('app_x5F_world--parent')">
        <transition name="fade">
            <img v-show="slideshowStatus.even === true" :src="images.waterfrontCityLandingPrimary" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.even === false" :src="images.waterfrontCityLandingSecondary" class="location-menu-item-image" />
        </transition>
    </div>
    <div class="location-menu-item" @click="navigateToLocation('app_x5F_world--parent')">
        <transition name="fade">
            <img v-show="slideshowStatus.odd === true" :src="images.tilalAlGhafLandingPrimary" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.odd === false" :src="images.tilalAlGhafLandingSecondary" class="location-menu-item-image" />
        </transition>
    </div>
    <div class="location-menu-item" @click="navigateToLocation('app_x5F_world--parent')">
        <transition name="fade">
            <img v-show="slideshowStatus.even === true" :src="images.alMoujMuscatLandingPrimary" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.even === false" :src="images.alMoujMuscatLandingSecondary" class="location-menu-item-image" />
        </transition>
    </div>
</div>
</template>

<style lang="scss" scoped>
.location-menu {
    width: 100%;
    height: 100%;
    display: flex;
    .location-menu-item {
        flex: 1;
        position: relative;
        .location-menu-item-image {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
}
</style>
