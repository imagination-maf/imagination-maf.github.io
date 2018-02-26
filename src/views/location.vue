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
                levelStructure: ['World-1-zoom', 'Region-1-zoom', 'City-1-zoom', 'borough', 'community'],
                mapStyle: {}
            }
        },
        computed : {
            levelName : function () {
                return this.$route.query.level;
            },
            levelId : function () {
                return this.$route.query.id;
            },
            zoomLevel: function () {
                let classList = {};
                classList[this.levelName] = true;
                if(this.levelId){
                    classList[this.levelId] = true;
                }
                return classList;
            }
        },
        methods: {
            zoom: function (dir) {
                let levelIndex = this.levelStructure.indexOf(this.levelName);
                console.log('level index', levelIndex);
                if(levelIndex + dir !== -1 && levelIndex + dir !== this.levelStructure.length) {
                    console.log('passing route');
                    this.$router.push({ query: { level: this.levelStructure[levelIndex + dir], id: this.levelId }});
                    this.getZoomTransform(this.levelStructure[levelIndex + dir]);
                }
            },
            mapClick: function($event) {
                // TODO Add check for corretc items;
                console.log('path', [$event.path[0]]);
                let levelIndex = this.levelStructure.indexOf(this.levelName);
                this.$router.push({ query: { level: this.levelStructure[levelIndex + 1] }});
                this.getZoomTransform(this.levelStructure[levelIndex + 1]);
            },
            getZoomTransform: function(zoomId) {
                let map = document.getElementById('svg-map');
                let zoomFocus = document.getElementById(zoomId);
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

                this.mapStyle = {'transform': `scale( ${scale} ) translate( ${translateX}px, ${translateY}px )`};
            }
        },
        mounted(){
            let svgMap = document.getElementById('svg-map');
            console.log('svg map >>>>>>', svgMap);
            svgMap.addEventListener('load', () => {
                svgMap.removeEventListener('load', () => {});
                this.$router.push({ query: { level: this.levelStructure[0] }});
                this.getZoomTransform(this.levelName);
            })
        }
    });
</script>

<template>
<div class="container">
    <div class="panel" v-show="levelName === 'World-1-zoom' || levelName === 'Region-1-zoom'">
        <h2 class="panel-title">GROUP FOOTPRINT</h2>
        <h3 class="panel-subtitle">UNITED ARAB EMIRATES</h3>
        <ul class="menu panel-text">
            <li class="menu-item">Communities</li>
            <li class="menu-item">Consumer Finance</li>
            <li class="menu-item">Energy & Facilities Management</li>
            <li class="menu-item">Fashion</li>
            <li class="menu-item">Hypermarkets & Supermarkets</li>
            <li class="menu-item">Healthcare</li>
            <li class="menu-item">Hotels</li>
            <li class="menu-item">Restaurants & Cafes</li>
            <li class="menu-item">Shopping Malls</li>
            <li class="menu-item">Speciality Retail Stores</li>
            <li class="menu-item">Unique Leisure Destinations</li>
        </ul>
    </div>
    <div class="map" :class="zoomLevel" @click="mapClick($event)">
        <MapImage id="svg-map" class="image" :style="[mapStyle]" />
    </div>
    <div class="controls" v-show="levelName !== 'World-1-zoom' && levelName !== 'Region-1-zoom'">
        <button class="button" type="button" @click="zoom(-1)">Zoom Out</button>
        <button class="button" type="button" @click="zoom(1)">Zoom In</button>
    </div>
</div>
</template>

<style lang="scss" scope>
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
}

.image {
    transition: transform 1.5s ease-out;
    overflow: visible !important;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
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
