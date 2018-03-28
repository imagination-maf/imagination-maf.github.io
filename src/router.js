import Vue from 'vue';
import VueRouter from 'vue-router';

import Attractor from './views/attractor.vue';
import CommunitySelection from './views/communitySelection.vue';
import Location from './views/location.vue';
import Community from './views/community.vue';
import Iframed from './views/iframed.vue';

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
            path: '/community',
            component: Community,
            name: 'community'
        }
    ]
});
