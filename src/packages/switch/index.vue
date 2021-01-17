<template>
  <div :class="[`${prefixCls}-switch`,{'switch-checked':checked},{'disabled':disabled}]" @click="_clicke" :style="style"></div>
</template>

<script>
import {prefixCls} from '../prefixCls'
export default {
  name: `${prefixCls}-switch`,
  data() {
    return {
      prefixCls:prefixCls,
      checked: this.value
    }
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
     change: Function,
    activeColor: String, // 打开时的颜色
    closeColor: String, // 关闭时的颜色
  },
  methods: {
    _clicke() {
      this.checked = !this.checked
    }
  },
  watch: {
    value(newv) {
      this.checked = newv
    },
    checked(newv) {
      this.$emit('input',newv)
    }
  },
  computed: {
      style() {
      let elStyle = {}
      if (this.value && this.activeColor) {
        // 打开状态，并设置了打开时的颜色
        elStyle = {
          borderColor: this.activeColor,
          backgroundColor: this.activeColor
        }
      }
      if (!this.value && this.closeColor) {
        elStyle = {
          borderColor: this.closeColor,
          backgroundColor: this.closeColor
        }
      }
      return elStyle
    }
  }
}
</script>

<style>

</style>