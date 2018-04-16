<script>
import Vue from 'vue';
import PropertyInfoSummary from './propertyInfo/propertyInfoSummary.vue';
import PropertyInfoFloorplan from './propertyInfo/propertyInfoFloorplan.vue';
import PropertyInfoTour from './propertyInfo/propertyInfoTour.vue';
import PropertyInfoGallery from './propertyInfo/propertyInfoGallery.vue';

export default Vue.component('property-info', {
    props: ['property'],
    components: {
        PropertyInfoSummary,
        PropertyInfoFloorplan,
        PropertyInfoTour,
        PropertyInfoGallery,
    },
    data() {
        return {
            currentView: 'summary'
        }
    },
    methods: {
        closeInfo: function() {
            this.$emit('close');
        },
        changeView: function(key) {
            this.currentView = key;
        }
    }
});
</script>

<template>
    <div class="info">
        <div class="info-content">
            <div class="info-close" @click="closeInfo()"></div>
            <PropertyInfoSummary v-if="currentView === 'summary'" :property="property" v-on:changeView="changeView" />
            <PropertyInfoFloorplan v-if="currentView === 'floorplan'" :property="property" v-on:changeView="changeView" />
            <PropertyInfoTour v-if="currentView === 'tour'" :property="property" v-on:changeView="changeView" />
            <PropertyInfoGallery v-if="currentView === 'gallery'" :property="property" v-on:changeView="changeView" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(200, 200, 200, 0.8);
    z-index: 6;
    .info-content {
        width: 70%;
        background-color: #ffffff;
        position: relative;
        padding: 5rem 3rem 5rem 6rem;
        box-shadow: 0.1rem 0.1rem 0.25rem #cccccc;
        margin-top: 4rem;
        .info-close {
            position: absolute;
            top: 0.65rem;
            right: 0.65rem;
            width: 2rem;
            height: 2rem;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            background-image: url('../images/overlay/close.png');
        }
        .info-title {
            border-bottom: 0.1rem solid #d7d7d7;
            color: #626263;
            text-transform: uppercase;
            margin: 0;
            padding-top: 3.6rem;
            font-size: 1.25rem;
            letter-spacing: 0.15rem;
            line-height: 2rem;
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
                padding-top: 3rem;
                letter-spacing: 0.1rem;
            }
            .info-features-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 0.5rem 2.5rem;
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
}
</style>
