<script>
    import Vue from 'vue';
    import LocationMenu from '../components/locationMenu.vue';
    import AppHeader from '../components/header.vue';

    export default Vue.component('attractor', {
        components: {
            AppHeader,
            LocationMenu
        },
        data() {
            return {
                mainLogo: require('../images/logo/logo.png'),
                interval: null,
                itemNum: 0
            }
        },
        methods: {
            navigateToMenu: function(community) {
                this.$router.push({ path: 'community-selection' });
            },
            navigateItems: function() {
                this.interval = window.setInterval( () => {
                    this.itemNum = (this.itemNum + 1) % 3;
                }, 5000);
            }
        },
        mounted() {
            this.navigateItems();
        },
        beforeDestroy() {
            window.clearInterval(this.interval);
            this.interval = null;
            delete this.interval;
        }
    });
</script>

<template>
    <div class="attractor">
        <transition name="fade">
            <div v-if="itemNum === 0" class="attractor-item centered" @click="navigateToMenu()">
                <img class="attractor-item-image" :src="mainLogo" />
            </div>
        </transition>
        <transition name="fade">
            <div v-if="itemNum === 1" class="attractor-item centered" @click="navigateToMenu()">
                <button type="button" class="attractor-item-button">Tap here to discover more</button>
            </div>
        </transition>
        <transition name="fade">
            <div v-if="itemNum === 2" class="attractor-item">
                <div class="app">
                    <AppHeader :logo="'maf'" />
                    <LocationMenu />
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
.attractor {
    width: 100%;
    height: 100%;
    display: flex;
    .attractor-item {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: stretch;
        &.centered {
            align-items: center;
        }
        .attractor-item-image {
            width: 50%;
        }
        .attractor-item-button {
            padding: 1rem 1.5rem 1rem 1.75rem;
            font-size: 1.7rem;
            background-color: #8a1538;
            color: #ffffff;
            margin-top: 3.5rem;
            font-weight: 200;
            letter-spacing: 0.025rem;
            margin-left: 0.5rem;
        }
    }
}
</style>
