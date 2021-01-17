<template>
  <div id="app">
    <demo :total="500" :current="page1" :pageSizes="[10,20,30]"/>
    <ss v-model="page" :options="['10','20','30']"/>
    <div @click="aaa">1 11</div>
    <div @click="aaa">1 11</div>
  </div>
</template>

<script>

import demo from './packages/pagination'
import ss from './packages/select'
export default {
  data() {
    return {
      page1: 1,
      page:2
    }
  },
  name: 'App',
  components: {
    demo,
    ss
  },
  methods: {
    aaa() {
    
      this.$message('tttt')
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './stylus/index.stylus';


</style>