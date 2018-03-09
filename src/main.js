import Vue from 'vue';
import VueRouter from 'vue-router';

import './sass/index.scss';

import Attractor from './views/attractor.vue';
import CommunitySelection from './views/communitySelection.vue';
import Location from './views/location.vue';
import Community from './views/community.vue';

import "./components/header.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Attractor,
            name: 'attractor'
        },
        {
            path: '/community-selection',
            component: CommunitySelection,
            name: 'community-selection'
        },
        {
            path: '/location',
            component: Location,
            name: 'location'
        },
        {
            path: '/community',
            component: Community,
            name: 'community'
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
