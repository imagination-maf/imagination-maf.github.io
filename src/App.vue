<template>
<main>
    <router-view></router-view>
</main>
</template>

<script>
import AppHeader from './components/header.vue';

export default {
	name: 'App',
	components: {
		appHeader: AppHeader
	}
};
</script>

<style>

</style>
