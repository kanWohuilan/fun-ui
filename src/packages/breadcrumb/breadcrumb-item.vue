<template>
  <span :class="`${prefixCls}-breadcrumb-item`">
    <span ref="link" class="link" :class="to ? 'is-link' : ''">
      <slot> </slot>
    </span>
    <span v-if="separator1" class="separator">{{separator1}}</span>
  </span>
</template>

<script>
import {prefixCls} from '../prefixCls'
export default {
  name: `${prefixCls}-breadcrumb-item`,
  data() {
    return {
      prefixCls: prefixCls,
      separator1: ''
    }
  },
  props: {
    to: {},
    replace: Boolean
  },
  inject:['separator'],
  mounted() {
    this.separator1 =this.separator;
    const link = this.$refs.link
    link.addEventListener('click',() => {
      if(!this.to || !this.$router) return
      this.replace? this.$router.replace(this.to) : this.$router.push(this.to)
    })
  }

}
</script>

<style>

</style>