<template>
	<button v-if="isIpad" @click="toggleHostMode">HOST MODE</button>
</template>

<script>
export default {
	name: 'host-mode',
	methods: {
        toggleHostMode: function() {
            if (this.$route.name == 'iframed') {
                this.$router.push({ path: 'community-selection' });
            } else {
                this.$router.push({ path: 'iframed' });
            }
        },
        isIpad: function() { 
            console.log('isIpad',this.isIpad);
            return navigator.userAgent.match(/iPad/i);
        }

    }
}
</script>

<style lang="scss" scoped>
button {
	position: absolute;
	top: 10px;
	right: 10px;
}
</style>
