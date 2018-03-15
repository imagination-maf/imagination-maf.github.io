<script>
import Vue from 'vue';

export default Vue.component('property-filter', {
    props: ['propertyTypeFilter', 'amenitiesFilter'],
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
            <h2 class="community-title">AL LILAC NEIGHBOURHOOD</h2>
        </div>
        <div class="community-list">
            <h3 class="community-menu-title">Residential properties</h3>
            <span>Tap to show/hide</span>
            <div class="community-menu-item">
                <p @click="changeFilter('3-bed-townhouse')">3-Bedroom Townhouse</p>
                <ul v-show="propertyTypeFilter['3-bed-townhouse']">
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
            <div>
                <p @click="changeFilter('3-bed-villa')">3-Bedroom Villa</p>
                <ul v-show="propertyTypeFilter['3-bed-villa']">
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
            <div>
                <p @click="changeFilter('4-bed-villa')">4-Bedroom Villa</p>
                <ul v-show="propertyTypeFilter['4-bed-villa']">
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
            <div>
                <p @click="changeFilter('5-bed-villa')">5-Bedroom Villa</p>
                <ul v-show="propertyTypeFilter['5-bed-villa']">
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
            <div>
                <p @click="changeFilter('6-bed-villa')">6-Bedroom Villa</p>
                <ul v-show="propertyTypeFilter['6-bed-villa']">
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
