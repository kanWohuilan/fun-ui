<template>
  <div><slot/></div>
</template>
<script>
import {prefixCls} from '../prefixCls'
export default {
  name: `${prefixCls}-tooltip`,
  data() {
    return {
      prefixCls : prefixCls
    }
  },
  props:{
    content: String,
    direction: {
      type: String,
       default: 'top-left'
    },
    maxWidth:{
      type:Number,
      default: 500
    },
    delay: {
       type:Number,
      default: 200
    },
    always: {
      type:Boolean,
      default:false
    }
  },
  mounted(){
    this.$el = this.$el.children[0]
    if(this.always) {
      this._createElement()
    }
    this.$el.addEventListener('mouseenter',this._mouseEnter)
    this.$el.addEventListener('mouseleave',this._mouseLeave)
  },
  methods: {
    _createElement() {
        let className = `${this.prefixCls}-tooltip ${this.direction}`
        this.tooltip = document.createElement('div')
        this.tooltip.className = className
        this.tooltip.style.maxWidth = parseInt(this.maxWidth)+ 'px'
        if(!this.content) return
        this.tooltip.innerHTML = this.content
        document.body.appendChild(this.tooltip)
        let style = this.tooltip.style
        const offsetInfo = this.$el.getBoundingClientRect()
        const space = 8
        switch (this.direction) {
          case 'top-left':
            style.left = offsetInfo.left+ 'px'
            style.top = (offsetInfo.top-this.tooltip.offsetHeight-space) + 'px'
            break;
        
          case 'top': 
          //先让标签左边与内容中间对齐 再让标签左移动自身的50%
            style.left= (offsetInfo.left+offsetInfo.width/2)+'px'
            
            style.transform = `translateX(-50%)`
            style.top = (offsetInfo.top-this.tooltip.offsetHeight-space) + 'px'
            break;
          case 'top-right':
            style.right= ((document.documentElement.clientWidth || document.body.clientWidth) - offsetInfo.right)+ 'px'
            style.top = (offsetInfo.top-this.tooltip.offsetHeight-space) + 'px'

            break
          case 'left':
            style.right = ((document.documentElement.clientWidth || document.body.clientWidth) - offsetInfo.left +space)+ 'px'
            style.top = (offsetInfo.top+ offsetInfo.height/2) + 'px'
          
            style.transform = `translateY(-50%)`
            break
          case 'right':
            style.left = (offsetInfo.right + space) + 'px'
            style.top = (offsetInfo.top+ offsetInfo.height/2) + 'px'
            style.transform = `translateY(-50%)`
            break
          case 'bottom-left':
             style.left = offsetInfo.left+ 'px'
             style.top = (offsetInfo.bottom +space) + 'px'
           break
         case 'bottom':
            style.left= (offsetInfo.left+offsetInfo.width/2)+'px'
            style.top = (offsetInfo.bottom+space) + 'px'
              style.transform = `translateX(-50%)`
           break
          case 'bottom-right':
            style.right= ((document.documentElement.clientWidth || document.body.clientWidth) - offsetInfo.right)+ 'px'
            style.top = (offsetInfo.bottom+space) + 'px'
           
        }
        
        
    },
    _mouseEnter() {
      if(this.tooltip && this.timer){
      //  document.body.removeChild(this.tooltip)
      //   this.tooltip = ''
      clearTimeout(this.timer)
      return
      }
      if(!this.always) {
           this._createElement()
      this.tooltip.addEventListener('mouseenter',this._tooltipEnter)
      this.tooltip.addEventListener('mouseleave',this._tooltipLeave)
      }
      
    },
    _mouseLeave() {
      if(!this.always) {
        this._removeElement()
      }
      
    },
    _tooltipEnter() {
      if(this.timer) {
        clearTimeout(this.timer)
      }
    },
    _tooltipLeave() {
      this._removeElement()
    },
    _removeElement() {
      this.timer = setTimeout(( ) => {
        if(this.tooltip){
          document.body.removeChild(this.tooltip)
          this.tooltip=''
        }
        
      },this.delay)
    },
    
  },
  destroyed() {
    //销毁组件时 删除tooltip 防止always不删除
     document.body.removeChild(this.tooltip)
  }
}
</script>
<style>
  
</style>