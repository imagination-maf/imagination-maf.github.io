<script>

    let io = require( 'socket.io-client' );

    export default {
        name: 'Iframed',
        data() {
            return {
                hostActive: false,
                showHost: false
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
                if (this.socket) {
                    console.log( 'switch mode', this.hostActive );
                    this.socket.emit( 'MESSAGE', { event: this.hostActive ? 'CLOSE_HOST' : 'LAUNCH_HOST', toAll:true });
                }
            },
            toggleHostMode: function( flag ) {
               console.log( '>>> toggleHostMode', flag );
               if ( flag ) {
                    this.hostActive = true;
                    setTimeout( () => this.showHost = this.hostActive, 500 );
                } else {
                    this.showHost = false;
                    setTimeout( () => this.hostActive = false, 500 );                    
                }

            }
        },
        mounted() {
            var self = this;

            this.socket = io('http://localhost:11099');
            
            this.socket.on('connect', () => {
                console.log( 'Connection to websocket server' );
            });

            this.socket.on('MESSAGE', (data) => {
                switch (data.event) {
                    
                    case 'LAUNCH_HOST':
                    console.log( [this] );
                        console.log( '[launching host]' );
                        self.toggleHostMode(true);
                        break;

                    case 'CLOSE_HOST':
                        console.log( '[closing host]' );
                        self.toggleHostMode(false);
                        break;
                }
            });
            
            this.socket.on('disconnect', () => {
                console.log( 'Connection to websocket server' );
            });

        }
    }
</script>

<template>

    <div class="container">
        <iframe v-if="hostActive" :class="{ show: showHost }" id="host" ref="host" src="http://localhost:3000"></iframe>
        <button v-if="isTablet()" class="host" :class="{ active: hostActive }" @click="switchMode">{{ hostActive ? "CLOSE HOST MODE" : "LAUNCH HOST MODE" }}</button>
 
        <div class="iframes" v-if="!hostActive && !isTablet()">
            <iframe id="iframe1" ref="iframe1" src="http://localhost:8080"></iframe>
            <iframe id="iframe2" ref="iframe2" src="http://localhost:8080"></iframe>
            <iframe id="iframe3" ref="iframe3" src="http://localhost:8080"></iframe>
            <iframe id="iframe4" ref="iframe4" src="http://localhost:8080"></iframe>
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
    }

    &.active {
        right: 0;
        bottom:0;
        transform: translate(0%, 0%);
        padding: 1rem 1.5rem;
        opacity:0.5;
    }

}
</style>
