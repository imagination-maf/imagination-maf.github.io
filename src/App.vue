<template>
<main>
    <app-header></app-header>
    <host-mode></host-mode>
    <div class="app">
        <router-view></router-view>
    </div>
</main>
</template>

<script>
import AppHeader from './components/header.vue';
import HostMode from './components/host-mode.vue';

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