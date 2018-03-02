<script>
    import Vue from 'vue';
    import WorldImage from '../images/maps/world.svg';
    import RegionImage from '../images/maps/region.svg';
    import City1Image from '../images/maps/city1.svg';
    import City2Image from '../images/maps/city2.svg';
    import City3Image from '../images/maps/city3.svg';

    export default Vue.component('location', {
        components: {
            WorldImage,
            RegionImage,
            City1Image,
            City2Image,
            City3Image
        },
        data() {
            return {
                definitions : {
                    'separator': '_',
                    'modifier': '--',
                    'button': 'button',
                    'zoom': 'zoom'
                },
                levelStructure: ['world', 'region', 'city', 'road'],
                mapStyle: {}
            }
        },
        computed : {
            levelName : function () {
                return this.$route.query.level;
            },
            levelId : function () {
                return this.$route.query.id;
            }
        },
        methods: {
            zoomOut: function () {
                let currentLevelIndex = this.levelStructure.indexOf(this.levelName);
                if(currentLevelIndex - 1  !== -1) {
                    let query = Object.assign({}, this.$route.query);
                    query.level = this.levelStructure[currentLevelIndex - 1];
                    this.$router.push({ path: 'location', query: query});
                }
            },
            // zoomIn: function () {
            //     let currentLevelIndex = this.levelStructure.indexOf(this.levelName);
            //     if(currentLevelIndex + 1  !== this.levelStructure.length) {
            //         let query = Object.assign({}, this.$route.query);
            //         let nextLevel = this.levelStructure[this.levelStructure.indexOf(this.levelName) + 1];
            //         query[nextLevel] = this.$route.query[this.levelName];
            //         query.level = nextLevel;
            //         this.$router.push({ query: query});
            //     }
            // },
            mapClick: function($event) {
                let pathElements = $event.path.reverse();
                for(var i = 0; i < pathElements.length; i++) {
                    if(pathElements[i].id && pathElements[i].id.split(this.definitions.separator)[0] === 'app') {
                        let separated = pathElements[i].id.split(this.definitions.modifier);
                        if(separated[separated.length - 1].match(this.definitions.button)){
                            let viewToFind = separated[0] + this.definitions.modifier + this.definitions.zoom;

                            let level = separated[0].split(this.definitions.separator).reverse()[0];
                            let name = level.replace(/[0-9]/g, '');
                            let val = level.replace(/\D/g, '').length ? level.replace(/\D/g,'') : null;

                            let currentLevel = this.levelStructure[ this.levelStructure.indexOf(name) - 1 ];

                            Vue.set(this.mapStyle, currentLevel, this.getPlacement(viewToFind, currentLevel));
                            this.$router.push({ query: {'level': name, 'id': val}});
                            break;
                        }
                    }
                }
            },
            findSVGPosition: function(element){
                let coor = {
                    min: {'x': null, 'y': null},
                    max: {'x': null, 'y': null}
                }

                for(var i = 0; i < Math.ceil(element.getTotalLength()); i++) {
                    let point = element.getPointAtLength(i)
                    coor.min.x = coor.min.x === null || point.x < coor.min.x ? point.x : coor.min.x;
                    coor.max.x = coor.max.x === null || point.x > coor.max.x ? point.x : coor.max.x;
                    coor.min.y = coor.min.y === null || point.y < coor.min.y ? point.y : coor.min.y;
                    coor.max.y = coor.max.y === null || point.y > coor.max.y ? point.y : coor.max.y;
                }

                return coor;
            },
            getPlacement: function(viewToFind, level) {
                let worldElement = document.getElementById('app_' + level + '--svg');
                let locationElement = document.getElementById(viewToFind);
                let locationCoords = this.findSVGPosition(locationElement);

                let scale = worldElement.width.baseVal.value / (locationCoords.max.x - locationCoords.min.x);
                let translateX = (worldElement.width.baseVal.value / 2) - ((locationCoords.min.x + locationCoords.max.x) / 2);
                let translateY = (worldElement.height.baseVal.value / 2) - ((locationCoords.min.y + locationCoords.max.y) / 2);

                return {
                    'transform': `translate( ${translateX * scale}px, ${translateY * scale}px ) scale3d(${scale}, ${scale}, 1)`
                }
            }
        },
        mounted(){
            // let svgMap = document.getElementById('svg-world');
            //
            // svgMap.addEventListener('load', () => {
            //     svgMap.removeEventListener('load', () => {});
            //     this.getZoomTransform();
            // })
        },
        watch: {
            levelName: function(){
                let levelIndex = this.levelStructure.indexOf(this.levelName);
                this.levelStructure.forEach( (level, index) => {
                    if(index >= levelIndex) {
                        Vue.set(this.mapStyle, level, {});
                    }
                })
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
    <div class="map" @click="mapClick($event)">
        <City3Image id="app_city3--svg" class="image" :style="[mapStyle.city]" :class="{ 'active': levelName === 'city' && levelId === '3' }" />
        <City2Image id="app_city2--svg" class="image" :style="[mapStyle.city]" :class="{ 'active': levelName === 'city' && levelId === '2' }" />
        <City1Image id="app_city1--svg" class="image" :style="[mapStyle.city]" :class="{ 'active': levelName === 'city' && levelId === '1' }" />
        <RegionImage id="app_region--svg" class="image" :style="[mapStyle.region]" :class="{ 'active': levelName === 'region' }" />
        <WorldImage id="app_world--svg" class="image" :style="[mapStyle.world]" :class="{ 'active': levelName === 'world' }" />
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
}

.image {
    position: absolute;
    left: 0;
    top: 0;
    overflow: visible !important;
    opacity: 0;
    pointer-events: none;
    transition: transform 0.75s ease-out, opacity 0.25s ease-out 0.5s;
    &.active {
        opacity: 1;
        pointer-events: auto;
    }
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
