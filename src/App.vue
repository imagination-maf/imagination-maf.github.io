<template>
<main>
    <router-view></router-view>
</main>
</template>

<script>

import { Socket } from './classes/socket.js';
import Config from './data/config.js';

export default {
	name: 'App',
    mounted() {
        let timer = null;
        let isBrowserSync = location.port + '' === Config.server.browserSyncPort + '';

        if ( isBrowserSync ) {

            Socket.instance.on("connect", () => {
                console.log( 'Connection to local WS Server' );
            });
            
            Socket.instance.on( 'MESSAGE', (data) => {
                if (data.event === 'resetSync' ) {
                    if ( this.$route.name !== 'iframed' ) {
                        this.$router.push({ path: '/' } );
                    }
                }
            });
                
            Socket.instance.on('disconnect', () => {
                console.log( 'Connection to websocket server' );
            });

        }

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
                    if (!isBrowserSync) {
                        this.$router.push({ path: '/' });
                    }
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
