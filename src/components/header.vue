<script>
import Vue from 'vue';

export default Vue.component('app-header', {
    props: ['logo', 'back'],
    data() {
        return {
            logos: {
                'maf': require('../images/logo/logo.png'),
                'alzahia': require('../images/logo/logo-alzahia.png'),
                'almouj': require('../images/logo/logo-almouj.png'),
                'tilalalghaf': require('../images/logo/logo-tilalalghaf.png'),
                'waterfront': require('../images/logo/logo-waterfront.png')
            }
        }
    },
    methods: {
        home: function() {
            if(this.$route.name !== 'community-selection') {
                this.$router.push({ path: 'community-selection'});
            } else {
                this.$router.push({ path: 'location', query: { view: 'app_x5F_world--parent' }});
            }
        },
        goBack: function() {
            this.$emit('back');
        }
    }
});
</script>

<template>
    <div class="header">
        <img class="header-logo" :src='logos[logo]' @click="home()" />
        <span class="header-back" v-if="back" @click="goBack()">BACK</span>
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
