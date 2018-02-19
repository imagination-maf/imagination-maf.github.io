import Vue from 'vue';

export default Vue.component('app-header', {
    data() {
        return {
            logo: require('../../images/logo/logo.png')
        }
    },
    methods: {
        home: function(){
            this.$router.push({ path: 'location', query: { level: 'region', id: null }});
        }
    },
    template: `
        <div class="header">
            <img class="header-logo" :src='logo' @click="home()" />
        </div>
        `
});
