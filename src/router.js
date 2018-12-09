import Vue from 'vue';
import VueRouter from 'vue-router';

import Attractor from './views/attractor.vue';
import CommunitySelection from './views/communitySelection.vue';
import Location from './views/location.vue';
import Overview from './views/overview.vue';
import Community from './views/community.vue';
import Iframed from './views/iframed.vue';
import TilalAlGhaf from './views/tilalalghaf.vue';
import Uptown from './views/uptown.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/iframed',
            component: Iframed,
            name: 'iframed'
        },
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
            path: '/overview',
            component: Overview,
            name: 'overview'
        },
        {
            path: '/community',
            component: Community,
            name: 'community'
        },
        {
            path: '/tilalalghaf',
            component: TilalAlGhaf,
            name: 'tilalalghaf'
        },
        {
            path: '/uptown',
            component: Uptown,
            name: 'uptown'
        }
    ]
});
