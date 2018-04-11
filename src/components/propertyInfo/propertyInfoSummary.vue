<script>
import Vue from 'vue';
import config from '../../data/config.js';
import propertyDetails from '../../data/propertyRooms.js';

export default Vue.component('property-info-summary', {
    props: ['property'],
    data() {
        return {
            images: {
                "iconBed": require('../../images/details/bed.png'),
                "iconBath": require('../../images/details/bath.png'),
                "iconSofa": require('../../images/details/sofa.png'),
                "iconGarage": require('../../images/details/garage.png')
            },
            details: propertyDetails
        }
    },
    computed: {
        community: function() {
            return this.$route.query.community;
        },
        neighbourhood: function() {
            return this.$route.query.neighbourhood;
        },
        name: function () {
            return this.$route.query.neighbourhood ? config.neighbourhoodNames[this.$route.query.neighbourhood] : ''
        },
        type: function () {
            let type = Object.keys(config.houseTypes).filter( (houseType) => config.houseTypes[houseType].indexOf(this.property.type) !== -1)[0];
            return config.houseTypeNames[type + this.property.bedrooms];
        },
        unitType: function () {
            return this.property.unit_type;
        },
        aspect: function () {
            return this.property.aspect ? this.property.aspect : 'general';
        }
    },
    methods: {
        changeView: function(view) {
            this.$emit('changeView', view);
        }
    }
});
</script>

<template>
    <div class="info-summary">
        <h3 class="info-title">{{ name }} {{ type }}</h3>
        <div class="info-row">
            <div class="info-features">
                <h3 class="info-row-title">FEATURES</h3>
                <div class="info-features-item" v-if="details[community][neighbourhood][unitType][aspect].bedrooms > -1 && details[community][neighbourhood][unitType][aspect].bedrooms !== undefined && details[community][neighbourhood][unitType][aspect].bedrooms !== null">
                    <img :src="images.iconBed" class="info-features-icon" />
                    <p class="info-features-text">{{ details[community][neighbourhood][unitType][aspect].bedrooms }}</p>
                </div>
                <div class="info-features-item" v-if="details[community][neighbourhood][unitType][aspect].bathrooms > -1 && details[community][neighbourhood][unitType][aspect].bathrooms !== undefined && details[community][neighbourhood][unitType][aspect].bathrooms !== null">
                    <img :src="images.iconBath" class="info-features-icon" />
                    <p class="info-features-text">{{ details[community][neighbourhood][unitType][aspect].bathrooms }}</p>
                </div>
                <div class="info-features-item" v-if="details[community][neighbourhood][unitType][aspect].livingrooms > -1 && details[community][neighbourhood][unitType][aspect].livingrooms !== undefined && details[community][neighbourhood][unitType][aspect].livingrooms !== null">
                    <img :src="images.iconSofa" class="info-features-icon" />
                    <p class="info-features-text">{{ details[community][neighbourhood][unitType][aspect].livingrooms }}</p>
                </div>
                <div class="info-features-item" v-if="details[community][neighbourhood][unitType][aspect].garages > -1 && details[community][neighbourhood][unitType][aspect].garages !== undefined && details[community][neighbourhood][unitType][aspect].garages !== null">
                    <img :src="images.iconGarage" class="info-features-icon" />
                    <p class="info-features-text">{{ details[community][neighbourhood][unitType][aspect].garages }}</p>
                </div>
            </div>
            <ul class="info-cta">
                <li class="info-cta-item" @click="changeView('floorplan')">Floor Plan</li>
                <!-- <li class="info-cta-item" click="changeView('tour')">360 Tour</li> -->
                <li class="info-cta-item" @click="changeView('gallery')">Photo Gallery</li>
            </ul>
        </div>
        <h3 class="info-row-title">DETAILS</h3>
        <div class="info-row">
            <div class="info-details">
                <div class="info-details-item">Lot Number: {{ property.plot_number }}</div>
                <div class="info-details-item">Type: {{ property.type }}</div>
                <div class="info-details-item">Built up Area: {{ property.builtup_area }}m</div>
            </div>
            <div class="info-details">
                <div class="info-details-item">Availability: {{ property.availability }}</div>
                <div class="info-details-item">Plot Area: {{ property.plot_area }}m</div>
                <div class="info-details-item">Price: {{ property.price }}AED</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info-summary {
    .info-title {
        border-bottom: 0.1rem solid #d7d7d7;
        color: #626263;
        text-transform: uppercase;
        letter-spacing: 0.15rem;
        font-size: 1.25rem;
    }
    .info-row {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 1rem 0;
    }
    .info-row-title {
        display: block;
        width: 100%;
        font-size: 1.2rem;
        letter-spacing: 0.08rem;
        margin: 0;
    }
    .info-features {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        .info-features-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 2.5rem;
            &:nth-child(2) {
                margin-left: 0;
            }
            .info-features-icon {
                width: 4.5rem;
                height: 4.5rem;
                object-fit: contain;
                object-position: center;
            }
            .info-features-text {
                color: #8a1337;
            }
        }
    }
    .info-cta {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 2rem;
        margin: 1.5rem 0 0;
        list-style-type: none;
        .info-cta-item {
            padding-left: 3.5rem;
            position: relative;
            font-size: 1.25rem;
            line-height: 2rem;
            margin: 0.5rem 0 1.25rem;
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: calc(50% - 1rem);
                width: 2.25rem;
                height: 2.25rem;
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                background-image: url('../../images/overlay/circle.png');
            }
        }
    }
    .info-details {
        width: 50%;
        &:first-child {
            padding-right: 1rem;
        }
        &:last-child {
            padding-left: 1rem;
        }
        .info-details-item {
            padding: 1.25rem 0;
            border-bottom: 0.1rem solid #d7d7d7;
        }
    }
}
</style>
