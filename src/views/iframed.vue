<script>

    import { Socket } from '../classes/socket.js';
    import config from '../data/config.js';

    export default {
        name: 'Iframed',
        data() {
            return {
                hostActive: false,
                showHost: false,
                browserSyncServer: `http://${window.location.hostname}:${config.server.browserSyncPort}`,
                httpServer: `http://${window.location.hostname}:${config.server.httpPort}`
            }
        },
        methods: {
            fullPath: function () {
                return this.$route.fullPath;
            },
            isTablet: function() {
			  return !!(navigator.userAgent.match(/iPad/i));
            },
            switchMode: function() {
                let msg = this.hostActive ? 'CLOSE_HOST' : 'LAUNCH_HOST';
                console.log( 'switch mode', msg );
                Socket.instance.emit( 'MESSAGE', { event: msg, toAll:true });
            },
            resetSync: function() {
                Socket.instance.emit( 'MESSAGE', { event: 'resetSync', toAll:true } );  
            }
        },
        mounted() {
            var self = this;

            Socket.instance.on('MESSAGE', (data) => {
                switch (data.event) {

                    case 'LAUNCH_HOST':
                        console.log( '[launch host...]' );
                        this.hostActive = true;
                        setTimeout( () => this.showHost = this.hostActive, 500 );
                        break;

                    case 'CLOSE_HOST':
                        console.log( '[close host]' );
                        this.hostActive = false;
                        setTimeout( () => this.showHost = this.hostActive, 500 );
                        break;
                }
            });

        }
    }
</script>

<template>

    <div class="container">
        <iframe v-if="hostActive" :class="{ show: showHost }" id="host" ref="host" :src="browserSyncServer"></iframe>
        <button v-if="isTablet()" class="host" :class="{ active: hostActive }" @click="switchMode">{{ hostActive ? "CLOSE HOST MODE" : "LAUNCH HOST MODE" }}</button>
        <button v-if="isTablet()" class="reset" :class="{ active: hostActive }" @click="resetSync">RESET</button>

        <div class="iframes" v-if="!hostActive && !isTablet()">
            <iframe id="iframe1" ref="iframe1" :src="httpServer"></iframe>
            <iframe id="iframe2" ref="iframe2" :src="httpServer"></iframe>
            <iframe id="iframe3" ref="iframe3" :src="httpServer"></iframe>
            <iframe id="iframe4" ref="iframe4" :src="httpServer"></iframe>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
}

.container .iframes {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
}

iframe {
    width: 50%;
    height: 50%;
    border: 0;
}

#iframe1, #iframe2 {
    transform: rotateZ(180deg);
}

#host {
    position: absolute;
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    opacity:0;
    transition: all 1s ease;

    &.show {
        opacity:1;
        width: 100%;
        height: 100%;
        transition: all 1s ease 1s;
    }
}

button {
    &.host {
        position: absolute;
        right:50%;
        bottom:50%;
        transform: translate(50%, 50%);
        z-index:999999;
        padding: 2rem 3rem;
        font-size: 2rem;
        background-color: rgb(138,21,56);
        color: rgb(255,255,255);
        outline: none;
        transition: all 1s ease;

        &.active {
            right: 0;
            bottom:0;
            transform: translate(0%, 0%);
            padding: 1rem 1.5rem;
            opacity:0.5;
        }
    }
   

    &.reset {
        position: absolute;
        left:0;
        bottom:0;
        z-index:999999;
        padding: 1rem 1.5rem;
        font-size: 2rem;
        background-color: rgb(138,21,56);
        color: rgb(255,255,255);
        outline: none;
        transition: all 1s ease;
        opacity:0;
    
        &.active {
            opacity:0.5;
        }
    }

    

}
</style>
