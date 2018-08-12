<template>
    <div id="app" :class="[{'gold': snStyle === 'gold'}, {'mes': snStyle === 'mes'}, {'lsq': snStyle === 'lsq'}]">
        <router-view />
    </div>
</template>
<script>
    import 'assets/scss/base.scss'
    import 'assets/scss/common.scss'

    export default {
        name: 'App',
        data(){
            return {
                snStyle: sessionStorage.getItem('retailer-style') || 'gold'
            }
        },
        created() {
            this.checkSnStyle()
        },
        methods: {
            checkSnStyle () {
                if (this.snStyle === 'gold') {
                    require('assets/scss/theme/gold.scss');
                } else if (this.snStyle === 'mes') {
                    require('assets/scss/theme/mes.scss');
                } else if (this.snStyle === 'lsq') {
                    require('assets/scss/theme/lsq.scss');
                }
            }
        }
    }
</script>
<style lang="scss">
    #app {
        overflow-x: hidden;
        width: 100%;
    }
</style>