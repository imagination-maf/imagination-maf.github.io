import Vue from 'vue';
import VueRouter from 'vue-router';

import './sass/index.scss';

import Attractor from './views/attractor.vue';
import Location from './views/location.vue';

import "./components/header.vue";

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
