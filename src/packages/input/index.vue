<template>
  <div :class="`${prefixCls}-form-input`">
    <input  :value="value"
           :type="inputType"
           :class="{'disabled':disabled,[prefixCls+'-input-control']:true,'has-prefix':$slots.prefix||prefixIcon}"
           :disabled="disabled"
           @input="_input"
           @focus="_focus"
           @blur="_blur"
           ref="input"/>
    <span class="prefix-icon" v-if="$slots.prefix||prefixIcon">
      <i :class="[prefixIcon]" v-if="prefixIcon"></i>
      <slot name="prefix"></slot>
    </span>
    <span class="suffix-icon">
      <slot name="suffix"></slot>
       <i :class="[suffixIcon]" v-if="suffixIcon"></i>
       <i class="icon-close"
          v-if="clear&&value"
          @click.stop="_clear"></i>
       <i :class="{'icon-eye-close':eyeShow,'icon-eye':!eyeShow}"
          v-if="value&&showEye && type==='password'"
          @click.stop="eyeShow=!eyeShow"></i>
      </span>
  </div>
</template>
<script>
import {prefixCls} from '../prefixCls'

export default {
  name: `${prefixCls}-input`,
  data() {
    return {
      prefixCls: prefixCls,
      inputType: this.type, // 密码框时要切换，所以不能写死type
      eyeShow: false
    }
  },
  watch: {
    eyeShow(value) {
      // 显示或隐藏密码
      this.inputType = value ? 'text' : 'password'
    },
  },
  props: {
    value: null,
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    clear: {
      type: Boolean,
      default: false
    },
    showEye: {
      // 密码框显示眼睛，可切换为明文密码
      type: Boolean,
      default: false
    },
    change: Function,
    prefixIcon: String, // 前缀icon
    suffixIcon: String // 后缀icon
  },
  components: {},
  methods: {
    _blur(e) {
      // const value = e.target.value
      this._emit('blur', e)
    },
    _input(e) {
      const value = e.target.value
      this.$emit('input', value)
      this.change && this.change(e)
      // 使用watch
      /* if (this.validateEvent) {
        this.dispatch('formItem', `${prefixCls}.form.change`, [value, e])
      } */
    },
    _focus(e) {
      this._emit('focus', e)
    },
    _clear() {
      this._emit('input', '')
    },
    _emit(type, e) {
      this.$emit(type, e)
      // this[type] && this[type](e)
    },
    focus() {
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    }
  },
}
</script>
