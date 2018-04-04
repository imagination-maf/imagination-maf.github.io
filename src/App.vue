<template>
<main>
    <router-view></router-view>
</main>
</template>

<script>

export default {
	name: 'App',
    mounted() {
        document.addEventListener('contextmenu', event => event.preventDefault());
    }
};
</script>

<style>

</style>
