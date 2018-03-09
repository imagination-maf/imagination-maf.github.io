<script>
    import Vue from 'vue';
    import PropertyFilter from '../components/propertyFilter.vue';
    import PropertyInfo from '../components/propertyInfo.vue';

    export default Vue.component('community', {
        components: {
            PropertyFilter,
            PropertyInfo
        },
        data() {
            return {
                propertyTypeFilter: {},
                amenitiesFilter: false,
                propertyInfoActive: false
            }
        },
        computed : {

        },
        methods: {
            setPropertyTypeFilter: function(key) {
                Vue.set(this.propertyTypeFilter, key, !this.propertyTypeFilter[key]);
            },
            setAmenitiesFilter: function() {
                this.amenitiesFilter = !this.amenitiesFilter;
            },
            openPropertyInfo: function() {
                this.propertyInfoActive = true;
            },
            closePropertyInfo: function() {
                this.propertyInfoActive = false;
            }
        }
    });
</script>

<template>
<div class="container">
    <h3>Community Pageee</h3>
    <p>Property Type Filter: {{ propertyTypeFilter }}</p>
    <p>Amenities Filter: {{ amenitiesFilter }}</p>
    <button @click="openPropertyInfo()" type="button">Open Property Info</button>

    <PropertyFilter :propertyTypeFilter="propertyTypeFilter" :amenitiesFilter="amenitiesFilter" v-on:setPropertyTypeFilter="setPropertyTypeFilter" v-on:setAmenitiesFilter="setAmenitiesFilter" />
    <PropertyInfo v-if="propertyInfoActive" v-on:close="closePropertyInfo" />
</div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}
</style>
