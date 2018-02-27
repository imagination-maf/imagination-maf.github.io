<script>
    import Vue from 'vue';
    import '../images/maps/css/map.css';
    import MapImage from '../images/maps/map.svg';

    export default Vue.component('location', {
        components: {
            MapImage
        },
        data() {
            return {
                levelStructure: ['world', 'region', 'city', 'road'],
                mapStyle: {}
            }
        },
        computed : {
            levelName : function () {
                return this.$route.query.level;
            }
        },
        methods: {
            zoomOut: function () {
                let currentLevelIndex = this.levelStructure.indexOf(this.levelName);
                if(currentLevelIndex - 1  !== -1) {
                    let query = Object.assign({}, this.$route.query);
                    delete query[this.levelName];
                    query.level = this.levelStructure[currentLevelIndex - 1];
                    this.$router.push({ path: 'location', query: query});
                }
            },
            zoomIn: function () {
                let currentLevelIndex = this.levelStructure.indexOf(this.levelName);
                if(currentLevelIndex + 1  !== this.levelStructure.length) {
                    let query = Object.assign({}, this.$route.query);
                    let nextLevel = this.levelStructure[this.levelStructure.indexOf(this.levelName) + 1];
                    query[nextLevel] = this.$route.query[this.levelName];
                    query.level = nextLevel;
                    this.$router.push({ query: query});
                }
            },
            mapClick: function($event) {
                // TODO Add check for correct items;
                console.log('path', [$event.path[0]]);
                // let levelIndex = this.levelStructure.indexOf(this.levelName);
                // this.$router.push({ query: { level: this.levelStructure[levelIndex + 1] }});
            },
            findZoomCoordinates: function(level, zoomId) {
                if(level === undefined || zoomId === undefined) {
                    return {'transform': `scale( 1 ) translate( 0px, 0px )`};
                }

                let map = document.getElementById(`svg-${level}`);

                let levelCapitalCase = level.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
                let zoomFocus = document.getElementById(`${levelCapitalCase}-${zoomId}-zoom`);

                let coor = {
                    min: {'x': null, 'y': null},
                    max: {'x': null, 'y': null}
                }
                for(var i = 0; i < Math.ceil(zoomFocus.getTotalLength()); i++) {
                    let point = zoomFocus.getPointAtLength(i)
                    coor.min.x = coor.min.x === null || point.x < coor.min.x ? point.x : coor.min.x;
                    coor.max.x = coor.max.x === null || point.x > coor.max.x ? point.x : coor.max.x;
                    coor.min.y = coor.min.y === null || point.y < coor.min.y ? point.y : coor.min.y;
                    coor.max.y = coor.max.y === null || point.y > coor.max.y ? point.y : coor.max.y;
                }

                let scale = window.innerWidth / (coor.max.x - coor.min.x);
                let translateX = (map.width.baseVal.value / 2) - ((coor.min.x + coor.max.x) / 2);
                let translateY = (map.height.baseVal.value / 2) - ((coor.min.y + coor.max.y) / 2);

                return {
                    'transform': `scale( ${scale} ) translate( ${translateX}px, ${translateY}px )`
                };
            },
            getZoomTransform: function(zoomId) {
                let mapStyleObjects = this.levelStructure.map( (level) => {
                    let obj = {};
                    obj[level] = this.findZoomCoordinates(level, this.$route.query[level]);
                    return obj;
                });
                this.mapStyle = Object.assign({}, ...mapStyleObjects);
            }
        },
        mounted(){
            let svgMap = document.getElementById('svg-world');

            svgMap.addEventListener('load', () => {
                svgMap.removeEventListener('load', () => {});
                this.getZoomTransform();
            })
        },
        watch: {
            levelName: function(){
                this.getZoomTransform();
            }
        }
    });
</script>

<template>
<div class="container">
    <div class="panel" v-show="levelName === 'world' || levelName === 'region'">
        <h2 class="panel-title">GROUP FOOTPRINT</h2>
        <h3 class="panel-subtitle">UNITED ARAB EMIRATES</h3>
        <ul class="menu panel-text">
            <li class="menu-item">Communities</li>
            <li class="menu-item">Consumer Finance</li>
            <li class="menu-item">Energy &amp; Facilities Management</li>
            <li class="menu-item">Fashion</li>
            <li class="menu-item">Hypermarkets &amp; Supermarkets</li>
            <li class="menu-item">Healthcare</li>
            <li class="menu-item">Hotels</li>
            <li class="menu-item">Restaurants &amp; Cafes</li>
            <li class="menu-item">Shopping Malls</li>
            <li class="menu-item">Speciality Retail Stores</li>
            <li class="menu-item">Unique Leisure Destinations</li>
        </ul>
    </div>
    <div class="map" :class="{'visible': levelName === 'world'}" @click="mapClick($event)">
        <MapImage id="svg-world" class="image" :style="[mapStyle.world]" />
    </div>
    <div class="map" :class="{'visible': levelName === 'region'}" @click="mapClick($event)">
        <MapImage id="svg-region" class="image" :style="[mapStyle.region]" />
    </div>
    <div class="map" :class="{'visible': levelName === 'city'}" @click="mapClick($event)">
        <MapImage id="svg-city" class="image" :style="[mapStyle.city]" />
    </div>
    <div class="map" :class="{'visible': levelName === 'road'}" @click="mapClick($event)">
        <MapImage id="svg-road" class="image" :style="[mapStyle.road]" />
    </div>
    <!--<div class="controls" v-show="levelName !== 'world' && levelName !== 'region'">-->
    <div class="controls">
        <button class="button" type="button" @click="zoomOut()">Zoom Out</button>
        <button class="button" type="button" @click="zoomIn()">Zoom In</button>
    </div>
</div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
}

.panel {
    left: 0;
    top: 0;
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    background: linear-gradient(to right, rgba(255, 255, 255, 1) 75%, rgba(255, 255, 255, 0) 100%);
    padding-left: 2rem;
    z-index: 1;
    .panel-title {
        padding-top: 3rem;
        color: #676767;
    }
    .panel-subtitle {
        color: #8a0836;
    }
    .panel-text {
        color: #777777;
    }
}

.map {
    width: 100%;
    height: 100%;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #cccccc;
    opacity: 0;
    pointer-events: none;
    &.visible {
        opacity: 1;
        pointer-events: auto;
    }
}

.image {
    transition-delay: 0.25s;
    transition: transform 1.5s ease-out;
    overflow: visible !important;
}

svg:not(:root) {
    overflow: visible !important;
}

.menu {
    display: flex;
    flex-direction: column;
}

.controls {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .button {
        font-size: 1.5rem;
        margin: 0 1rem;
    }
}
</style>
