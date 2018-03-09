<script>
import Vue from 'vue';

export default Vue.component('marker-info', {
    props: ['data']

});
</script>

<template>
    <div class="panel" v-if="data">
        <h2 class="panel-title">GROUP FOOTPRINT</h2>
        <h3 class="panel-subtitle">{{ data.title }}</h3>
        <ul class="menu panel-text">
            <li class="menu-item" v-for="item in data.items">{{ item }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.panel {
    left: 0;
    top: 0;
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    background: linear-gradient(to right, rgba(255, 255, 255, 1) 75%, rgba(255, 255, 255, 0) 100%);
    padding-left: 2rem;
    z-index: 1;
    .panel-title {
        padding-top: 3rem;
        color: #676767;
    }
    .panel-subtitle {
        color: #8a0836;
    }
    .panel-text {
        color: #777777;
    }
}
</style>
