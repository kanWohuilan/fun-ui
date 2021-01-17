<!-- 所有存在父组件active的子组件名字的子组件展开 -->
<template>
  <div :class="prefixCls + '-collapse'">
    <slot> </slot>
  </div>
</template>

<script>
import {prefixCls} from '../prefixCls'
export default {
  name:`${prefixCls}-collapse`,
data() {
  
  return {
    //所有展开的标签名
  active: [],
  prefixCls:prefixCls
  }
},
props: {
  //是否只展开一个
   accordion: {
     type: Boolean,
     default:false
   },
   //任意标签改变时的回调函数
   change: Function

  },
  methods: {
    _change(v) {
      this.change && this.change(v)
    }
  }
}
</script>

<style>

</style>