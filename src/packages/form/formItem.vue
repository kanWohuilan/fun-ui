

<template>
  <div :class="`${prefixCls}-form-item` ">
    <label v-if="label || $slots.label" class="form-label">
      <slot name="label">{{label}}</slot>
    </label>
    <div class="form-box">
      <slot> </slot>
      
    </div>
  </div>
</template>

<script>
import {prefixCls} from '../prefixCls'
export default {
    name: `${prefixCls}-form-item`,
    data() {
      return {
        prefixCls:prefixCls
      }
    },
    props: {
      rules: {
        type: Object
      },
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    }
}
</script>

<style>

</style>