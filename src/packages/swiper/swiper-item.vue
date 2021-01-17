<template>
  <div class="swiper-item" :style="itemStyle">
    <slot> </slot>
    <div class="index" v-if="!$slots.default" >{{$parent.current}}</div>
   
  </div>
</template>

<script>

import {prefixCls} from '../prefixCls'
export default {
 name: `${prefixCls}-swiper-item`,
  computed: {
    itemStyle() {
      return {
        width: this.$parent.containerwidth + 'px',
        height: this.$parent.containerHeight + 'px'
      }
    }
  }
}
</script>

<style>

</style>