

<template>
  <div :class="`${prefixCls}-cascader`">
    <slot></slot>
  </div>
</template>

<script>
import {prefixCls} from '../prefixCls'
export default {
    name: `${prefixCls}-cascader`,
    data() {
      return {
        prefixCls:prefixCls,
      }
    },
    props: {
      
    }
}
</script>

<style>

</style>