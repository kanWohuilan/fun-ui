<template>
  <div id="app">
    <Head :isComponent="isComponent"> </Head>
    <router-view></router-view>
  </div>
</template>

<script>
import Head from './components/header.vue'
export default {
  data() {
    return {
      isComponent: false
    }
  },
  name: 'App',
  components: {
Head
  },
  watch: {
    $route: {
      handler(val) {
        if(val.fullPath==='/index') {
          this.isComponent=true
        }else {
          this.isComponent=false
        }
      }
    }
  }

}
</script>
<style lang="stylus" scoped>
#app
  height 100%
// @import './stylus/index.stylus';


</style>

