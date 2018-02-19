import Vue from 'vue';
import VueRouter from 'vue-router';

import './sass/index.scss';

import Attractor from './views/attractor/attractor.js';
import Location from './views/location/location.js';

import "./components/header/header.js";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Attractor
        },
        {
            path: '/location',
            component: Location
        }
    ]
});

new Vue({
  el: '#app',
  router,
  template: `
<main>
    <app-header></app-header>
    <div class="app">
        <router-view></router-view>
    </div>
</main>
`,
})
