<template>
  <button
  :class="[
  `${prefixCls}-button`,
  {'is-disabled':disabled},
  {'is-round ': round},
  type ? `${prefixCls}-button-${type}` : ''
  ]" @click = 'handleClick'
  > 
  <i v-if="icon" :class="icon"></i>
 <slot> </slot>
  </button>
</template>
<script>
import {prefixCls} from '../prefixCls'
export default {
  name: `${prefixCls}-button`,
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  props: {
    round: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: String,//目前唯一可选类型primary,plain
    routerTo: String,
    icon: String 
  },
  methods: {
    handleClick(e) {
      if(!this.disabled) {
        this.$emit('click',e)
      }
      if(this.routerTo) {
        this.$router.push({path: this.routerTo})
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
// @import '../../stylus/mixin.stylus';
// @import '../../stylus/button.stylus';

</style>

