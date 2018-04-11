<script>
import Vue from 'vue';
import config from '../data/config.js';
import communityPositions from '../data/communityPositions.js'

export default Vue.component('property-filter', {
    props: ['propertyTypeList', 'propertyTypeFilter', 'amenitiesFilter'],
    data() {
        return {
            houseTypeNames: config.houseTypeNames,
            logos: {
                'allilac': require('../images/neighbourhoods/logo-allilac.png'),
                'alnarjis': require('../images/neighbourhoods/logo-alnarjis.png'),
                'aljouri': require('../images/neighbourhoods/logo-aljouri.png')
            }
        }
    },
    computed: {
        list: function() {
            return Array.from(this.propertyTypeList);
        },
        name: function() {
            return communityPositions[this.$route.query.community][this.$route.query.neighbourhood].fullname;
        },
        amenitiesAvailable: function() {
            return communityPositions[this.$route.query.community][this.$route.query.neighbourhood].amenities.length > 0;
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
        <div class="community-panel">
            <div class="community-icon">
                <img class="community-neighbourhood-icon" :src="logos[$route.query.neighbourhood]" />
                <h2 class="community-title">{{ name }}<br/>NEIGHBOURHOOD</h2>
            </div>
            <div class="community-list">
                <h3 class="community-menu-title">Residential properties</h3>
                <span class="community-menu-span">Tap to show/hide</span>
                <div class="community-menu-item" :class="{ 'first': index === 0 }" v-for="(item, index) in list">
                    <p class="property-list-name" @click="changeFilter('active_' + item)">{{ houseTypeNames[item] }}</p>
                    <ul class="property-list" v-show="propertyTypeFilter['active_' + item]">
                        <li class="property-list-item">
                            <div class="status available" :class="[item]"></div>
                            <span class="property-list-text">Available</span>
                        </li>
                        <li class="property-list-item">
                            <div class="status unavailable" :class="[item]"></div>
                            <span class="property-list-text">Unavailable</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="community-list" v-if="amenitiesAvailable">
                <h3 class="community-menu-title">Residential Amenities</h3>
                <span class="community-menu-span" @click="changeAmenitiesVisiblity()">Tap to show/hide</span>
            </div>
            <div class="community-list">
                <h3 class="community-menu-title">Commerical Properties</h3>
                <span class="community-menu-span">Coming soon</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.community {
    width: 25%;
    height: 100%;
    background-color: #ffffff;
    z-index: 1;
    overflow: auto;
    position: relative;
    .community-panel {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        padding: 1rem 3.25rem 1rem 4.5rem;
    }
    .community-menu-item {
        margin-top: 1.725rem;
        &.first {
            margin-top: 0;
        }
    }
    .community-menu-title {
        width: 100%;
        border-bottom: 0.1rem solid #000;
        margin: 0;
        font-size: 1.35rem;
        letter-spacing: 0.1rem;
        font-weight: 200;
        line-height: 1.75rem;
    }
    .community-menu-span {
        display: block;
        font-size: 0.8rem;
        font-weight: 200;
        margin: 0;
        color: #9c9c9c;
        margin-top: 0.4rem;
    }
}

.community-list {
    padding-top: 2.6rem;
}

.community-icon {
    width: 100%;
    padding-top: 1.75rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .community-neighbourhood-icon {
        width: 21.5%;
    }
    .community-title {
        margin: 0.35rem;
        font-weight: 200;
        text-align: center;
        font-size: 1.5rem;
        letter-spacing: 0.07rem;
    }
}

.property-list-name {
    margin: 0;
    margin-top: 0.95rem;
    letter-spacing: 0.075rem;
}

.property-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    .property-list-item {
        display: flex;
        align-items: center;
        margin: 0.25rem 0rem;
    }
    .property-list-text {
        color: #9c9c9c;
        letter-spacing: 0.05rem;
        font-weight: 200;
    }
}

.status {
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    border: 0.1rem solid;
    margin-right: 0.75rem;
    &.apartmentStudio {
        &.available {
            background-color: rgb(248,151,21);
            border-color: rgb(248,151,21);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(248,151,21);
        }
    }
    &.apartment1 {
        &.available {
            background-color: rgb(0,177,176);
            border-color: rgb(0,177,176);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(0,177,176);
        }
    }
    &.apartment2 {
        &.available {
            background-color: rgb(0,150,214);
            border-color: rgb(0,150,214);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(0,150,214);
        }
    }
    &.apartment3 {
        &.available {
            background-color: rgb(95,86,98);
            border-color: rgb(95,86,98);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(95,86,98);
        }
    }
    &.apartment4 {
        &.available {
            background-color: rgb(0,70,127);
            border-color: rgb(0,70,127);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(0,70,127);
        }
    }
    &.apartment5 {
        &.available {
            background-color: rgb(253,185,19);
            border-color: rgb(253,185,19);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(253,185,19);
        }
    }
    &.townhouse2 {
        &.available {
            background-color: rgb(253,185,19);
            border-color: rgb(253,185,19);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(253,185,19);
        }
    }
    &.townhouse3 {
        &.available {
            background-color: rgb(108,164,57);
            border-color: rgb(108,164,57);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(108,164,57);
        }
    }
    &.townhouse4 {
        &.available {
            background-color: rgb(0,70,127);
            border-color: rgb(0,70,127);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(0,70,127);
        }
    }
    &.villa3 {
        &.available {
            background-color: rgb(248,151,21);
            border-color: rgb(248,151,21);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(248,151,21);
        }
    }
    &.villa31 {
        &.available {
            background-color: rgb(248,151,21);
            border-color: rgb(248,151,21);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(248,151,21);
        }
    }
    &.villa4 {
        &.available {
            background-color: rgb(0,177,176);
            border-color: rgb(0,177,176);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(0,177,176);
        }
    }
    &.villa5 {
        &.available {
            background-color: rgb(0,150,214);
            border-color: rgb(0,150,214);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(0,150,214);
        }
    }
    &.villa6 {
        &.available {
            background-color: rgb(95,86,98);
            border-color: rgb(95,86,98);
        }
        &.unavailable {
            background-color: transparent;
            border-color: rgb(95,86,98);
        }
    }
}
</style>
