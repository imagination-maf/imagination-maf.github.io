<script>
import Vue from 'vue';

export default Vue.component('property-info-tour', {
    props: ['property'],
    methods: {
        backToSummary: function() {
            this.$emit('changeView', 'summary');
        }
    }
});
</script>

<template>
    <div class="info-tour">
        <h3 class="info-title">360 Tour</h3>
        <button type="button" @mousedown="backToSummary()">Go Back to Summary</button>
    </div>
</template>

<style lang="scss" scoped>
.info-tour {
    .info-title {
        border-bottom: 0.1rem solid #d7d7d7;
        color: #626263;
    }
}
</style>
