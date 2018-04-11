<template>
<main>
    <router-view></router-view>
</main>
</template>

<script>

export default {
	name: 'App',
    mounted() {
        let timer = null;

        document.addEventListener('contextmenu', event => {
            event.preventDefault();
        });

        let addListeners = (element, eventNames, listener) => {
            let events = eventNames.split(' ');
            for (let i = 0; i < events.length; i++) {
                element.addEventListener(events[i], listener, false);
            }
        }

        let setupTimer = () => {
            timer = window.setTimeout( () => {
                if(this.$route.path !== '/iframed') {
                    this.$router.push({ path: '/' });
                }
                resetTimer();
            }, 180000);
        }

        let resetTimer = () => {
            window.clearTimeout(timer);
            setupTimer();
        }

        addListeners(window, 'touchstart touchmove mousedown', resetTimer);
        setupTimer();
    }
};
</script>

<style>

</style>
