<script>
    import Vue from 'vue';

    export default Vue.component('iframed', {
        name: 'Iframed',
        data() {
            return {}
        },
        methods: {
            fullPath: function () {
                return this.$route.fullPath;
            }
        }
    });
</script>

<template>
    <div class="container">
        <iframe id="iframe1" ref="iframe1" :src="fullPath"></iframe>
        <iframe id="iframe2" ref="iframe2" :src="fullPath"></iframe>
        <iframe id="iframe3" ref="iframe3" :src="fullPath"></iframe>
        <iframe id="iframe4" ref="iframe4" :src="fullPath"></iframe>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
}

iframe {
    width: 50%;
    height: 50%;
    border: 0;
}

#iframe1, #iframe2 {
    transform: rotateZ(180deg);
}
</style>
