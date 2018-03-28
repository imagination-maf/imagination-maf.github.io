<script>
import Vue from 'vue';

export default Vue.component('app-header', {
    data() {
        return {
            logo: require('../images/logo/logo.png')
        }
    },
    methods: {
        home: function() {
            this.$router.push({ path: 'location', query: { view: 'app_x5F_world--parent' }});
        },
        goBack: function() {
            this.$router.go(-1);
        }
    },
    computed: {
        requiresHeader: function () {
            return !(this.$route.name == 'iframed' || this.$route.name == 'attractor');
        }
    }
});
</script>

<template>
    <div class="header" v-if="requiresHeader">
        <img class="header-logo" :src='logo' @click="home()" />
        <div class="header-back">
            <span @click="goBack()">BACK</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    z-index: 2;
    width: 100%;
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    box-shadow: 1rem 0.25rem 6rem #aaa;
    .header-logo {
        height: 3.5rem;
        width: auto;
        margin-left: 8rem;
    }
    .header-back {
        display: block;
        margin-right: 8rem;
        font-size: 1.2rem;
    }
}
</style>
