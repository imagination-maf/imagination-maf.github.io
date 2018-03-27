<script>
import Vue from 'vue';

export default Vue.component('location-menu', {
    data() {
        return {
            interval: null,
            slideshowStatus: {
                'status': 'odd',
                'odd': 0,
                'even': 0
            },
            images: {
                amm1: require('../images/attractor/al-mouj-muscat/AMM-1.png'),
                amm2: require('../images/attractor/al-mouj-muscat/AMM-2.png'),
                amm3: require('../images/attractor/al-mouj-muscat/AMM-3.png'),
                amm4: require('../images/attractor/al-mouj-muscat/AMM-4.png'),
                amm5: require('../images/attractor/al-mouj-muscat/AMM-5.png'),
                az1: require('../images/attractor/al-zahia/AZ-1.png'),
                az2: require('../images/attractor/al-zahia/AZ-2.png'),
                az3: require('../images/attractor/al-zahia/AZ-3.png'),
                az4: require('../images/attractor/al-zahia/AZ-4.png'),
                az5: require('../images/attractor/al-zahia/AZ-5.png'),
                tag1: require('../images/attractor/tilal-al-ghaf/TAG-1.png'),
                tag2: require('../images/attractor/tilal-al-ghaf/TAG-2.png'),
                tag3: require('../images/attractor/tilal-al-ghaf/TAG-3.png'),
                tag4: require('../images/attractor/tilal-al-ghaf/TAG-4.png'),
                tag5: require('../images/attractor/tilal-al-ghaf/TAG-5.png'),
                wfc1: require('../images/attractor/waterfront-city/WFC-1.png'),
                wfc2: require('../images/attractor/waterfront-city/WFC-2.png'),
                wfc3: require('../images/attractor/waterfront-city/WFC-3.png'),
                wfc4: require('../images/attractor/waterfront-city/WFC-4.png'),
                wfc5: require('../images/attractor/waterfront-city/WFC-5.png')
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
            this.slideshowStatus.status = this.slideshowStatus.status === 'odd' ? 'even' : 'odd';
            this.slideshowStatus[this.slideshowStatus.status] = (this.slideshowStatus[this.slideshowStatus.status] + 1) % 5;
        }, 2500);
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
    <div class="location-menu-item disabled" @click="navigateToLocation('app_x5F_UAE--parent')">
        <transition name="fade">
            <img v-show="slideshowStatus.odd === 0" :src="images.tag1" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.odd === 1" :src="images.tag2" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.odd === 2" :src="images.tag3" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.odd === 3" :src="images.tag4" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.odd === 4" :src="images.tag4" class="location-menu-item-image" />
        </transition>
        <div class="location-menu-header">
            <h2 class="location-menu-title">TILAL AL GHAF</h2>
            <h3 class="location-menu-subtitle">UNITED ARAB EMIRATES</h3>
        </div>
    </div>
    <div class="location-menu-item" @click="navigateToLocation('app_x5F_UAE--parent')">
        <transition name="fade">
            <img v-show="slideshowStatus.even === 0" :src="images.az1" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.even === 1" :src="images.az2" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.even === 2" :src="images.az3" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.even === 3" :src="images.az4" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.even === 4" :src="images.az5" class="location-menu-item-image" />
        </transition>
        <div class="location-menu-header">
            <h2 class="location-menu-title">AL ZAHIA</h2>
            <h3 class="location-menu-subtitle">UNITED ARAB EMIRATES</h3>
        </div>
    </div>
    <div class="location-menu-item" @click="navigateToLocation('app_x5F_Oman--parent')">
        <transition name="fade">
            <img v-show="slideshowStatus.odd === 0" :src="images.amm1" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.odd === 1" :src="images.amm2" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.odd === 2" :src="images.amm3" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.odd === 3" :src="images.amm4" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.odd === 4" :src="images.amm5" class="location-menu-item-image" />
        </transition>
        <div class="location-menu-header">
            <h2 class="location-menu-title">AL MOUJ MUSCAT</h2>
            <h3 class="location-menu-subtitle">OMAN</h3>
        </div>
    </div>
    <div class="location-menu-item disabled" @click="navigateToLocation('app_x5F_Lebanon--parent')">
        <transition name="fade">
            <img v-show="slideshowStatus.even === 0" :src="images.wfc1" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.even === 1" :src="images.wfc2" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.even === 2" :src="images.wfc3" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.even === 3" :src="images.wfc4" class="location-menu-item-image" />
        </transition>
        <transition name="fade">
            <img v-show="slideshowStatus.even === 4" :src="images.wfc5" class="location-menu-item-image" />
        </transition>
        <div class="location-menu-header">
            <h2 class="location-menu-title">WATERFRONT CITY</h2>
            <h3 class="location-menu-subtitle">LEBANON</h3>
        </div>
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
        &.disabled {
            filter: grayscale(1);
            pointer-events: none;
            opacity: 0.5;
        }
        .location-menu-header {
            position: absolute;
            top: 5.75rem;
            left: 4.25rem;
            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                height: 0.1rem;
                width: 4rem;
                background-color: #ffffff;
            }
            .location-menu-title {
                font-size: 2rem;
                letter-spacing: 0.32rem;
                color: #ffffff;
                margin: 0.75rem 0;
            }
            .location-menu-subtitle {
                font-size: 0.95rem;
                color: #ffffff;
                margin: 0;
                font-weight: 200;
                letter-spacing: 0.25rem;
            }
        }
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
