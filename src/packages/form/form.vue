

<template>
  <form :class="`${prefixCls}-form`">
    <slot></slot>
  </form>
</template>

<script>
import {prefixCls} from '../prefixCls'
export default {
    name: `${prefixCls}Form`,
    data() {
      return {
        prefixCls:prefixCls,
        fields: [],//需要验证的字段
        defaultModel: {} //用于保存所有表单元素初始值
      }
    },
    props: {
      rules: {
        type: Object
      }
    }
}
</script>

<style>

</style>