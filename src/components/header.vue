<script>
import Vue from 'vue';

export default Vue.component('app-header', {
    data() {
        return {
            logo: require('../images/logo/logo.png')
        }
    },
    methods: {
        home: function(){
            this.$router.push({ path: 'location', query: { level: 'region', id: null }});
        }
    }
});
</script>

<template>
    <div class="header">
        <img class="header-logo" :src='logo' @click="home()" />
    </div>
</template>

<style lang="scss" scoped>
.header {
    z-index: 1;
    width: 100%;
    height: 8rem;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    .header-logo {
        height: 3.5rem;
        width: auto;
        margin-left: 8rem;
    }
}
</style>
