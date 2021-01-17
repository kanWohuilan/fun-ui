// 参考elementui 源码,通过改变dom的height加overflow完成渐出渐入动画,height取dom的scrollHeight padding改变位置 
import {prefixCls} from './prefixCls'

const elTransition = '0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out'
const Transition = {
  'before-enter' (el) {
    el.style.transition = elTransition
    if (!el.dataset) el.dataset = {}

    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom

    el.style.height = 0
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  },

  'enter' (el) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    } else {
      el.style.height = ''
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }

    el.style.overflow = 'hidden'
  },

  'after-enter' (el) {
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
  },

  'before-leave' (el) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow

    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  },

  'leave' (el) {
    if (el.scrollHeight !== 0) {
      el.style.transition = elTransition
      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }
  },

  'after-leave' (el) {
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }
}

export default {
  name: `${prefixCls}Transition`,
  functional: true,
  /* props: {
     name: String
   }, */
  render (h, {children}) {
    let data = {
      on: Transition
    }
    // console.log('-------------')
    // console.log(children)
    return h('transition', data, children)
  }
}
