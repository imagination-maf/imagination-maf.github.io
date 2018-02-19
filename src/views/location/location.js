import Vue from 'vue';
import MapImage from '../../images/maps/homer-simpson.svg';

export default Vue.component('location', {
    components: {
        MapImage
    },
    data() {
        return {
            levelStructure: ['region', 'country', 'city', 'borough', 'community']
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
            if(levelIndex + dir !== -1 && levelIndex + dir !== this.levelStructure.length) {
                this.$router.push({ query: { level: this.levelStructure[levelIndex + dir], id: this.levelId }});
            }
        },
        mapClick: function($event) {
            console.log('event', $event);

            let classValue = $event.path[0].classList.value;
            console.log('list', classValue);
            switch(classValue){
                case 'option1':
                    console.log('here')
                    this.$router.push({ query: { level: 'city', id: 'waterfront-city' }});
                    break;
                case 'option2':
                    this.$router.push({ query: { level: 'city', id: 'tilal-al-ghaf' }});
                    break;
                case 'option3':
                    this.$router.push({ query: { level: 'city', id: 'al-zahia' }});
                    break;
            }
        }
    },
    template: `
        <div class="container">
            <div class="panel" v-show="levelName === 'region' || levelName === 'country'">
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
                <MapImage class="image"/>
            </div>

            <div class="controls" v-show="levelName !== 'region' && levelName !== 'country'">
                <button class="button" type="button" @click="zoom(-1)">Zoom Out</button>
                <button class="button" type="button" @click="zoom(1)">Zoom In</button>
            </div>
        </div>
    `
});
