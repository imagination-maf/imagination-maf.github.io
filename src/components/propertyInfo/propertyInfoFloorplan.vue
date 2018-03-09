<script>
import Vue from 'vue';

export default Vue.component('property-info-floorplan', {
    methods: {
        backToSummary: function() {
            this.$emit('changeView', 'summary');
        }
    }
});
</script>

<template>
    <div class="info-floorplan">
        <h3 class="info-title">FLOORPLAN</h3>
        <button type="button" @click="backToSummary()">Go Back to Summary</button>
    </div>
</template>

<style lang="scss" scoped>
.info-floorplan {
    .info-title {
        border-bottom: 0.1rem solid #d7d7d7;
        color: #626263;
    }
}
</style>
