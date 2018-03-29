<script>
import Vue from 'vue';
import config from '../data/config.js';

export default Vue.component('property-filter', {
    props: ['propertyTypeList', 'propertyTypeFilter', 'amenitiesFilter'],
    data() {
        return {
            houseTypeNames: config.houseTypeNames
        }
    },
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
                <p @click="changeFilter('active_' + item)">{{ houseTypeNames[item] }}</p>
                <ul class="property-list" v-show="propertyTypeFilter['active_' + item]">
                    <li class="property-list-item">
                        <div class="status available" :class="[item]"></div>
                        <span>Available</span>
                    </li>
                    <li class="property-list-item">
                        <div class="status unavailable" :class="[item]"></div>
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
    overflow: auto;
    padding: 1rem 1rem;
}
.property-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    .property-list-item {
        display: flex;
        align-items: center;
        margin: 0.25rem 1rem;
    }
}

.status {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    border: 0.1rem solid;
    margin-right: 1rem;
    &.apartmentStudio {
        &.available {
            background-color: rgb(246,150,46);
            border-color: rgb(246,150,46);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(246,150,46);
        }
    }
    &.villa3 {
        &.available {
            background-color: rgb(246,150,46);
            border-color: rgb(246,150,46);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(246,150,46);
        }
    }
    &.apartment1 {
        &.available {
            background-color: rgb(251,184,49);
            border-color: rgb(251,184,49);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(251,184,49);
        }
    }
    &.villa4 {
        &.available {
            background-color: rgb(251,184,49);
            border-color: rgb(251,184,49);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgba(251,184,49,0.9);
        }
    }
    &.apartment2 {
        &.available {
            background-color: rgb(28,177,175);
            border-color: rgb(28,177,175);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(28,177,175);
        }
    }
    &.villa5 {
        &.available {
            background-color: rgb(28,177,175);
            border-color: rgb(28,177,175);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(28,177,175);
        }
    }
    &.apartment3 {
        &.available {
            background-color: rgb(95,96,98);
            border-color: rgb(95,96,98);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(95,96,98);
        }
    }
    &.villa6 {
        &.available {
            background-color: rgb(95,96,98);
            border-color: rgb(95,96,98);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(95,96,98);
        }
    }
    &.townhouse2 {
        &.available {
            background-color: rgb(109,163,64);
            border-color: rgb(109,163,64);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(109,163,64);
        }
    }
    &.townhouse3 {
        &.available {
            background-color: rgb(24,151,212);
            border-color: rgb(24,151,212);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(24,151,212);
        }
    }
    &.townhouse4 {
        &.available {
            background-color: rgb(7,71,125);
            border-color: rgb(7,71,125);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(7,71,125);
        }
    }
}
</style>
