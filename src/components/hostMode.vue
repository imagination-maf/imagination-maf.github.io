<template>
	<button v-if="showSelf" @click="toggleHostMode">HOST MODE</button>
</template>

<script>
export default {
	name: 'host-mode',
	data: function () {
		return {
			showSelf: false
		}
	},
	methods: {
		toggleHostMode: function () {
			this.$route.name == 'iframed' ? this.$router.push({ path: 'community-selection' }) : this.$router.push({ path: 'iframed' });
		},
		isIpad: function () {
			console.log('!!(navigator.userAgent.match(/iPad/i));',!!(navigator.userAgent.match(/iPad/i)));
			return !!(navigator.userAgent.match(/iPad/i));
		},
		inIframe: function () {
			try {
				return window.self !== window.top;
			} catch (e) {
				return true;
			}
		},
		setShowSelf: function () {
			console.log('!!(this.isIpad && !this.inIframe)',!!(this.isIpad && !this.inIframe));
			this.showSelf = !!(this.isIpad() && !this.inIframe());
		}
	},
	created: function () {
		this.setShowSelf();
	}
}
</script>

<style lang="scss" scoped>
button {
	position: absolute;
	bottom: 10px;
	right: 10px;
	z-index: 1000;
    padding: 1rem 2rem;
    font-size: 2rem;
    background-color: rgb(138,21,56);
    color: rgb(255,255,255);
}
</style>
