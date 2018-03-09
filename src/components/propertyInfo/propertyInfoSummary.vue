<script>
import Vue from 'vue';

export default Vue.component('property-info-summary', {
    data() {
        return {
            images: {
                "iconBed": require('../../images/details/bed.png'),
                "iconBath": require('../../images/details/bath.png'),
                "iconSofa": require('../../images/details/sofa.png'),
                "iconGarage": require('../../images/details/garage.png')
            }
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
        <h3 class="info-title">AL LILAC 4-BEDROOM VILLA</h3>
        <div class="info-row">
            <div class="info-features">
                <h3>FEATURES</h3>
                <div class="info-features-item">
                    <img :src="images.iconBed" class="info-features-icon" />
                    <p class="info-features-text">3.5</p>
                </div>
                <div class="info-features-item">
                    <img :src="images.iconBath" class="info-features-icon" />
                    <p class="info-features-text">3</p>
                </div>
                <div class="info-features-item">
                    <img :src="images.iconSofa" class="info-features-icon" />
                    <p class="info-features-text">2</p>
                </div>
                <div class="info-features-item">
                    <img :src="images.iconGarage" class="info-features-icon" />
                    <p class="info-features-text">3</p>
                </div>
            </div>
            <ul class="info-cta">
                <li class="info-cta-item" @click="changeView('floorplan')">Floor Plan</li>
                <li class="info-cta-item" @click="changeView('tour')">360 Tour</li>
                <li class="info-cta-item" @click="changeView('gallery')">Photo Gallery</li>
            </ul>
        </div>
        <h3>Details</h3>
        <div class="info-row">
            <div class="info-details">
                <div class="info-details-item">Lot Number: 178</div>
                <div class="info-details-item">Type: Villa</div>
                <div class="info-details-item">Built up Area: 5,356m<!--<sup>2</sup>--></div>
            </div>
            <div class="info-details">
                <div class="info-details-item">Avaliability: Avaliable</div>
                <div class="info-details-item">Plot Area: 4,785m<!--<sup>2</sup>--></div>
                <div class="info-details-item">Price: 3,450,000 AED</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info-summary {
    .info-title {
        border-bottom: 0.1rem solid #d7d7d7;
        color: #626263;
    }
    .info-row {
        width: 100%;
        display: flex;
        align-items: center;
    }
    .info-features {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        h3 {
            display: block;
            width: 100%;
        }
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
            padding: 2rem 0;
            border-bottom: 0.1rem solid #d7d7d7;
        }
    }
}
</style>
