<script>
import Vue from 'vue';

import MarkerData from '../data/markerData.js';

export default Vue.component('marker-info', {
    props: ['country'],
    computed: {
        panelData: function() {
            return MarkerData[this.country];
        }
    }
});
</script>

<template>
<div class="panel">
    <div class="panel-content">
        <h2 class="panel-title">GROUP FOOTPRINT</h2>
        <p class="panel-subtitle">Select a location on the map.</p>
        <div v-if="panelData" class="panel-data">
            <h2 class="panel-data-title">{{ panelData.title }}</h2>
            <transition-group name="slide-info" tag="ul" appear>
                <li v-for="(item, index) in panelData.items" class="panel-data-item" :key="item" :style="{ 'transition-delay': (index * 0.1) + 's' }">{{ item }}</li>
            </transition-group>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.panel {
    position: absolute;
    left: 0;
    top: 0;
    width: 33.3333%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
    .panel-content {
        padding-top: 4.35rem;
        padding-left: 5.25rem;
        .panel-title {
            margin: 0;
            font-size: 1.75rem;
            letter-spacing: 0.2rem;
            color: #3c3c3d;
        }
        .panel-subtitle {
            margin: 0;
            font-size: 1.1rem;
            color: #3c3c3d;
        }
        .panel-data {
            margin-top: 8rem;
            .panel-data-title {
                margin: 0;
                font-size: 1.7rem;
                letter-spacing: 0.2rem;
                line-height: 2.35rem;
                border-bottom: 1px solid #3c3c3d;
                color: #8a1538;
                width: auto;
                display: inline-block;
            }
            ul {
                margin: 1.4rem 0;
                padding: 0;
                list-style-type: none;
                .panel-data-item {
                    margin: 0 0 1.175rem;
                    font-size: 1.1rem;
                    color: #3c3c3d;
                }
            }
        }
    }
}

</style>
