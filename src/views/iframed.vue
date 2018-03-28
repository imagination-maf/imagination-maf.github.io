<script>
    export default {
        name: 'Iframed',
        data() {
            return {}
        },
        methods: {
            fullPath: function () {
                return this.$route.fullPath;
            }
        }
    }
</script>

<template>
    <div class="container">
        <iframe id="iframe1" ref="iframe1" src="http://localhost:8080"></iframe>
        <iframe id="iframe2" ref="iframe2" src="http://localhost:8080"></iframe>
        <iframe id="iframe3" ref="iframe3" src="http://localhost:8080"></iframe>
        <iframe id="iframe4" ref="iframe4" src="http://localhost:8080"></iframe>
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
