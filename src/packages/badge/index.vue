<template>
  <span :class="[`${prefixCls}-badge`]">
    <span><slot> </slot></span>
    <sup v-html="showValue" v-show="dot" :class="value ? 'valueDot' : 'Dot'"></sup>
  </span>
</template>

<script>
import {prefixCls} from '../prefixCls'
export default {
  name : `${prefixCls}-badge`,
  mounted() {
    console.log(this.value);
  },
  data() {
    return {
      prefixCls:prefixCls,
      
    }
  },
  props: {
    //圆圈内数值
    value: [String,Number],
    //是否显示圆圈
    dot: {
      type: Boolean,
      default:true
    },
    //数值最大值
    max: Number
  },
  computed: {
    showValue() {
      //判断是否为数字 
      if(!isNaN(this.value) && this.value > this.max ) {
        return this.max + '+'
      }else {
        return this.value
      }
    },
    // dotShow() {
    //   return this.value && this.dot
    // }
  }
}
</script>

<style>

</style>