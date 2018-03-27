<script>
import Vue from 'vue';
import config from '../data/config.js';

export default Vue.component('property-filter', {
    props: ['propertyTypeList', 'propertyTypeFilter', 'amenitiesFilter'],
    computed: {
        list: function() {
            return Array.from(this.propertyTypeList);
        },
        name: function() {
            return config.dataPoints[this.$route.query.community][this.$route.query.neighbourhood].fullname;
        }
    },
    methods: {
        changeFilter: function(key) {
            // Vue call to bind the new styles to the data object
            this.$emit('setPropertyTypeFilter', key);
        },
        changeAmenitiesVisiblity: function() {
            this.$emit('setAmenitiesFilter');
        }
    }
});
</script>

<template>
    <div class="community">
        <div class="community-icon">
            <h2 class="community-title">{{ name }} NEIGHBOURHOOD</h2>
        </div>
        <div class="community-list">
            <h3 class="community-menu-title">Residential properties</h3>
            <span>Tap to show/hide</span>
            <div class="community-menu-item" v-for="item in list">
                <p @click="changeFilter('active_' + item)">{{ item }}</p>
                <ul v-show="propertyTypeFilter['active_' + item]">
                    <li>
                        <div class="status available" style="background-color: #11c"></div>
                        <span>Available</span>
                    </li>
                    <li>
                        <div class="status unavailable" style="background-color: #11c"></div>
                        <span>Unavailable</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="community-list">
            <h3 class="community-menu-title">Residential Amenities</h3>
            <span @click="changeAmenitiesVisiblity()">Tap to show/hide</span>
        </div>
        <div class="community-list">
            <h3 class="community-menu-title">Commerical Properties</h3>
            <span>Coming soon</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.community {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    padding: 0 2rem;
    z-index: 1;
}
</style>
