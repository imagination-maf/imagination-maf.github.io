<template>
<main>
    <host-mode></host-mode>
    <router-view></router-view>
</main>
</template>

<script>
import AppHeader from './components/header.vue';
import HostMode from './components/hostMode.vue';

export default {
	name: 'App',
	components: {
		appHeader: AppHeader,
		hostMode: HostMode
	}
};
</script>

<style>

</style>
