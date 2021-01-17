<template>
  <div class="`${prefixCls}-waterfall-item`">
    <slot> </slot>
  </div>
</template>

<script>
import {prefixCls} from "../prefixCls"
export default {
data() {
  return {
    prefixCls:prefixCls
  }
},
props: {
//列数
 
}
}
</script>

<style>

</style>