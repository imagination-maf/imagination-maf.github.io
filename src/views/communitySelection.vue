<script>
    import Vue from 'vue';
    import LocationMenu from '../components/locationMenu.vue';
    import AppHeader from '../components/header.vue';

    export default Vue.component('community-selection', {
        components: {
            AppHeader,
            LocationMenu
        },
        data() {
            return {}
        }
    });
</script>

<template>
    <div class="app">
        <AppHeader :logo="'maf'" />
        <div class="menu">
            <LocationMenu />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.menu {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
