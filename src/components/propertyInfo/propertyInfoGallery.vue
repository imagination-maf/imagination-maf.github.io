<script>
import Vue from 'vue';

export default Vue.component('property-info-gallery', {
    props: ['property'],
    methods: {
        backToSummary: function() {
            this.$emit('changeView', 'summary');
        }
    }
});
</script>

<template>
    <div class="info-gallery">
        <h3 class="info-title">Photo Gallery</h3>
        <button type="button" @click="backToSummary()">Go Back to Summary</button>
    </div>
</template>

<style lang="scss" scoped>
.info-gallery {
    .info-title {
        border-bottom: 0.1rem solid #d7d7d7;
        color: #626263;
    }
}
</style>
