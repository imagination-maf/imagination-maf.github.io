import Vue from 'vue';

export default Vue.component('attractor', {
    data() {
        return {
            alZahiaLanding: require('../../images/attractor/al-zahia/al-zahia.png'),
            waterfrontCityLanding: require('../../images/attractor/waterfront-city/waterfront-city.png'),
            tilalAlGhafLanding: require('../../images/attractor/tilal-al-ghaf/tilal-al-ghaf.png'),
            alMoujMuscatLanding: require('../../images/attractor/al-mouj-muscat/al-mouj-muscat.png')
        }
    },
    methods: {
        navigateToLocation: function(community) {
            this.$router.push({ path: 'location', query: { level: 'city', id: community }});
        }
    },
    template: `
        <div class="attractor">
            <div class="attractor-item" @click="navigateToLocation('al-zahia')">
                <img :src="alZahiaLanding" class="attractor-item-image" />
            </div>
            <div class="attractor-item" @click="navigateToLocation('waterfront-city')">
                <img :src="waterfrontCityLanding" class="attractor-item-image" />
            </div>
            <div class="attractor-item" @click="navigateToLocation('tilal-al-ghaf')">
                <img :src="tilalAlGhafLanding" class="attractor-item-image" />
            </div>
            <div class="attractor-item" @click="navigateToLocation('al-mouj-muscat')">
                <img :src="alMoujMuscatLanding" class="attractor-item-image" />
            </div>
        </div>
        `
});
