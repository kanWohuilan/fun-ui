<template>
  <div :class="`${prefixCls}-backTop`" @click="_click"
  :style="{position:'fixed', right: right+'px',bottom: bottom+ 'px',visibility:show?'visible':'hidden',opacity:show?1:0 }"> 
    <i :class="icon" v-if="icon"></i>
  <a href="javascript:;" v-if="textShow">{{text}}</a>
  </div>
</template>

<script>
import {prefixCls} from '../prefixCls'
export default {
  name:`${prefixCls}-backTop`,
  data() {
    return {
      prefixCls: prefixCls,
      show: false
    }
  },
  props: {
    text: {
      type: String,
      default: '返回顶部'
    },
    textShow: {
      type: Boolean,
      default:true
    },
    scrollHeight: {
      type: Number,
      default: 300
    },
    icon: {
      type: String,
      default: 'icon-backTop'
    },
    bottom: {
      type: Number,
      default: 30
    },
    right: {
      type: Number,
      default: 30
    },

  },
  mounted() {
    this.$nextTick(() => {
      document.body.appendChild(this.$el)
      
      window.addEventListener('scroll',this._windowScroll)
    })
  },
  methods: {
    _click() {
      let timer= setInterval(() => {
        //不断监听scrollTop 计算速度 ,表现为减速运动越往上速度越慢,当scrollTop=0的时候清除计时器
        let speed =Math.floor(-this.scrollTop/5)
        document.documentElement.scrollTop = this.scrollTop + speed
        if(this.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 20);
      this.$emit('click')
      //有props传入的click是 就会触发click函数
      this.click && this.click()
    },
    _windowScroll() {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(this.scrollTop > this.scrollHeight) {
        this.show = true
      }else {
        this.show = false
      }
    }
  }
}
</script>

<style>

</style>