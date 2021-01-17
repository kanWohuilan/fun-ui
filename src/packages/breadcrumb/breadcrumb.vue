<template>
  <div :class="`${prefixCls}-breadcrumb`">
    <slot> </slot>
  </div>
</template>

<script>
import {prefixCls} from '../prefixCls'
export default {
  name: `${prefixCls}-breadcrumb`,
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  props: {
    separator: {
      type: String,
      default: '/'
    }
  },
  provide() {
    return{
      separator: this.separator
    }
  }
}
</script>

<style>

</style>