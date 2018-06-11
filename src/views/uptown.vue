<script>
    import Vue from 'vue';
    import AppHeader from '../components/header.vue';
    import uptownData from '../data/uptown.js';

    export default Vue.component('community', {
        components: {
            AppHeader
        },
        data() {
            return {
                loaded: false,
                pngContainerScale: null,
                data: uptownData,
                backgroundImg: require('../images/overalls/overview-alzahia.png'),
                table: process.env.NODE_ENV === 'table',
                property: null,
                filter: 'interior',
                slide: 0
            }
        },
        computed: {
            community: function() {
                return this.$route.query.community;
            },
            neighbourhood: function() {
                return this.$route.query.neighbourhood;
            },
            propertyName: function() {
                if(this.property) {
                    return this.data[this.neighbourhood].items.filter( item => item.id === this.property )[0].text;
                } else {
                    return null;
                }
            }
        },
        methods: {
            backToOverview: function() {
                this.$router.push({ path: 'overview', query: {community: this.community} });
            },
            backToProperties: function() {
                this.property = null;
                this.slide = 0;
                this.filter = 'interior';
            },
            showProperty: function(propertyId) {
                this.property = propertyId;
            },
            changeSlide: function(dir) {
                this.slide = ((this.slide + dir) + this.data[this.neighbourhood].images[this.property][this.filter].length) % this.data[this.neighbourhood].images[this.property][this.filter].length;
            },
            changeFilter: function(filter) {
                if(this.filter !== filter) {
                    this.slide = 0;
                    this.filter = filter;
                }
            }
        },
        mounted() {
            let pngImage = document.getElementById('png-image');
            pngImage.addEventListener('load', () => {
                this.loaded = true;
                this.pngContainerScale = {'transform': 'scale(' + (window.innerWidth / pngImage.width) + ')' };
            });
        }
    });
</script>

<template>
<div class="app">
    <AppHeader :logo="community" back="true" v-on:back="backToOverview" />
    <div class="container blur">
        <div id="area" :class="{ 'visible': loaded }">
            <div id="png-container" :style="pngContainerScale">
                <img :src="backgroundImg" class="png-image" id="png-image" />
            </div>
        </div>
    </div>
    <div class="tilal" v-if="!property">
        <div class="tilal-content">
            <h2 class="tilal-title">{{ data[neighbourhood].title }}</h2>
            <div class="tilal-row">
                <div class="tilal-options">
                    <ul class="tilal-cta">
                        <li class="tilal-cta-item" v-for="item in data[neighbourhood].items" @click="showProperty(item.id)">{{ item.text }}</li>
                    </ul>
                </div>
                <div class="tilal-image-container">
                    <img v-if="!table" class="tilal-image" :src="data[neighbourhood].image" />
                    <img v-if="table" class="tilal-image" :src="data[neighbourhood]['image-local']" />
                </div>
            </div>
            <button class="tilal-button" @click="backToOverview()">Back to the Masterplan</button>
        </div>
    </div>
    <div class="tilal" v-if="property">
        <div class="tilal-content less-padding">
            <h2 class="tilal-title">{{ propertyName }}</h2>
            <div class="tilal-gallery">
                <div class="image-container" v-if="slide === index" v-for="(image, index) in data[neighbourhood].images[property][filter]">
                    <h3 class="image-text" v-if="image.text">{{ image.text }}</h3>
                    <img v-if="table" class="image" :src="image.image.local">
                    <img v-if="!table" class="image" :src="image.image.cloud">
                </div>
                <button v-show="data[neighbourhood].images[property][filter].length > 1" class="arrow left" type="button" @click="changeSlide(-1)"></button>
                <button v-show="data[neighbourhood].images[property][filter].length > 1" class="arrow right" type="button" @click="changeSlide(1)"></button>
                <div class="pagination" v-show="data[neighbourhood].images[property][filter].length > 1">
                    <div v-for="(page, index) in data[neighbourhood].images[property][filter]" class="pagination-item" :class="{'active': index === slide}" @click="changeToSlideNum(index)"></div>
                </div>
            </div>
            <div class="tilal-row">
                <button class="tilal-button" @click="backToProperties()">Back to Properties</button>
                <div class="buttons">
                    <button @click="changeFilter('interior')" class="tilal-button wider" :class="{'active': filter === 'interior'}">Interior Gallery</button>
                    <button @click="changeFilter('exterior')" class="tilal-button wider" :class="{'active': filter === 'exterior'}">Exterior Gallery</button>
                    <button @click="changeFilter('floorplan')" class="tilal-button" :class="{'active': filter === 'floorplan'}">Floor Plan</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
    &.blur {
        filter: blur(0.5rem);
    }
}

#area {
    width: 100%;
    height: 100%;
    position: relative;
    opacity: 0;
}

#png-container {
    position: absolute;
    left: 0;
    top: -8rem;
    overflow: hidden;
    transform-origin: 0px 0px 0px;
    #png-image {
        transition: filter 0.5s ease-out, opacity 0.5s ease-out;
    }
}

svg:not(:root) {
    overflow: visible !important;
}

.tilal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .tilal-content {
        width: 70%;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        padding: 9rem 6rem 7rem;
        margin-top: 6rem;
        box-shadow: 0.25rem 0.25rem 1rem #cccccc;
        &.less-padding {
            padding: 3rem 6rem 2rem;
        }
    }
    .tilal-title {
        font-size: 1.5rem;
        line-height: 3.5rem;
        letter-spacing: 0.025rem;
        border-bottom: 0.1rem solid #4A4A4A;
        margin: 0;
        font-weight: 200;
    }
    .tilal-row {
        width: 100%;
        display: flex;
    }
    .tilal-options {
        width: 50%;
        margin: 0;
        padding-right: 3rem;
        margin-top: 1.5rem;
        font-size: 1.2rem;
        letter-spacing: 0.025rem;
        line-height: 2.2rem;
        font-weight: 200;
    }
    .tilal-image-container {
        width: 50%;
        position: relative;
        .tilal-image {
            width: 100%;
            margin-top: 2rem;

        }
        .tilal-image-text {
            position: absolute;
            line-height: 2rem;
            top: calc(50% - 1rem);
            left: 0;
            right: 0;
            color: #ffffff;
            text-align: center;
            font-size: 2.5rem;
            letter-spacing: 0.2rem;
        }
    }
    .tilal-button {
        background-color: #8a1538;
        color: #ffffff;
        padding: 0.75rem 0;
        margin-top: 1rem;
        width: 18.1%;
        font-size: 1.15rem;
        font-weight: 200;
        &.wider {
            width:25%;
        }
    }
    .tilal-cta {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 2rem;
        margin: 1.5rem 0 0;
        list-style-type: none;
        .tilal-cta-item {
            padding-left: 3.5rem;
            position: relative;
            font-size: 1.25rem;
            line-height: 2rem;
            margin: 1.2rem 0 1.5rem;
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: calc(50% - 1rem);
                width: 2.25rem;
                height: 2.25rem;
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                background-image: url('../images/overlay/circle.png');
            }
        }
    }
    .tilal-gallery {
        width: 100%;
        position: relative;
        .arrow {
            width: 9rem;
            height: 9rem;
            position: absolute;
            top: calc(50% - 4.5rem);
            background-color: transparent;
            border-radius: 100%;
            outline: none;
            background-image: url('../images/overlay/circle.png');
            background-position: center;
            background-size: 33.33%;
            background-repeat: no-repeat;
            &.left {
                left: 0rem;
                transform: scaleX(-1);
            }
            &.right {
                right: 0rem;
            }
        }
        .image-container {
            width: 100%;
            min-height: 42rem;
            .image {
                width: 100%;
                max-height: 62vh;
                object-fit: contain;
                object-position: center;
            }
        }
    }

    .buttons {
        width: 80%;
        margin-left: 11.9%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        .tilal-button {
            flex: 1;
            margin: 0 1rem;
            &.active {
                background-color: #ffffff;
                border: 0.1rem solid #8A1538;
                color: #8A1538;
            }
        }
    }

    .image-text {
        position: absolute;
        left: 7.5rem;
        top: 5rem;
        margin: 0;
        font-weight: lighter;
        font-size: 1.75rem;
    }

    .pagination {
        position: absolute;
        bottom: 3rem;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        .pagination-item {
            background-color: #ffffff;
            border: 0.1rem solid #8A1538;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 100%;
            margin: 0 0.5rem;
            &.active {
                border-color: #ffffff;
                background-color: #8A1538;
            }
        }
    }
}
</style>

<style lang="scss">
#area {
    opacity: 0;
    transition: opacity 0.75s ease;
    &.visible {
        opacity: 1;
    }
}
</style>
