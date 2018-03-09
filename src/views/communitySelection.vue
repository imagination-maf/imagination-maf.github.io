<script>
    import Vue from 'vue';
    import LocationMenu from '../components/locationMenu.vue';

    export default Vue.component('community-selection', {
        components: {
            LocationMenu
        },
        data() {
            return {}
        }
    });
</script>

<template>
    <div class="menu">
        <LocationMenu />
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
