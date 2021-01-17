<template>
<transition :name="animation">
  <div :class="[`${prefixCls}-dialog`,
  {isfullScreen: fullScreen}]" 
  ref="dialog"
  v-show="visible"
  :style="{
    zIndex:zIndex2,
    animationDuration: '.3s'
  }"
  >
  <div :class="[`${prefixCls}-dialog-header`,]">
   {{title}}
  </div>
  <span :class="`${prefixCls}-dialog-close icon-close`"
  v-if="showClose" @click="_close"></span>
    <div :class="`${prefixCls}-dialog-content`">
      <div :class="`${prefixCls}-dialog-text`">
        <slot> </slot>
      </div>
        
    </div>
    <div :class="`${prefixCls}-dialog-footer`" v-if="confirm || cencel">
      <bbutton v-if="confirm" @click="_confirm"> {{confirm}}</bbutton>
      <bbutton v-if="cancel" @click="_cancel" type= 'primary'> {{cancel}}</bbutton>
    </div>
  </div>
  </transition>
</template>

<script>
import {prefixCls} from '../prefixCls'
import bbutton from '../button'
export default {
  name:`${prefixCls}-dialog`,
  components: {
    bbutton
  },
  data() {
    return {
      prefixCls: prefixCls,
      visible:false,//dialog显示方法
      zIndex2: this.zIndex
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    animation: {
      type: String,
      default:'zoom'
      //可选动画zoom、flip、door、rotate、slideDown、slideUp、slideLeft、slideRight
    },
    zIndex: {
      type: Number,
      default: 2020
    },
   
    title: String,
    //dialog 标题
    confirm: String,//确认按钮
    cencel: String,//取消按钮
    fullScreen: {
      type:Boolean,
      default:false
    },//是否全屏弹窗
    autoClose: {
      type:Number,
      default:0
    },//设置自动关闭时间
    showClose: {
      type:Boolean,
      default:true
    },//是否显示关闭按钮
    modal: {
      type:Boolean,
      default:true
    },//遮罩层显示
    closeModal: {
      type:Boolean,
      default:true
    },//是否可以点击遮罩层关闭dialog
     isAlert: {
      // 用于区别引用形式，组件或者是插件，不需要通过外部传参。true时关闭弹窗时同时从body移除
      type: Boolean,
      default: false
    },
    beforeClose: Function,

  },
  mounted() {
    
    this.$nextTick(()=> {
      window.addEventListener('resize',this._resize)
      this._getwindow()
     this._setPosition() 
     console.log(this.windowWidth);
        if(this.value) {
         this.visible=true
      this._openModal()
     
    }
    
    })
    
  },
  methods: {
    //遮罩显示方法
    _openModal() {
      
      
      //判断是否显示遮罩
      if(this.modal) {
        //创建遮罩元素并添加body上
        const modalDiv = document.createElement('div')
        modalDiv.className = `${prefixCls}-dialog-modal active`
        modalDiv.style.display = 'block'
        modalDiv.style.zIndex = this.zIndex2-1
        modalDiv.style.animationDuration = '.3s'
        document.body.appendChild(modalDiv)
 
      //  const modal = document.querySelector(`${prefixCls}-dialog-modal.active`)
      if(this.closeModal) {
         modalDiv.addEventListener('click',this._modalClick)
      }
      }
    },
    _getwindow() {
      this.windowWidth = document.documentElement.clientWidth || document.boby.clientWidth 
      this.windowheight = document.documentElement.clientHeight|| document.boby.clientHeight 
     
    },
     _setPosition () {
     this.$refs.dialog.style.top= this.windowheight / 2  - this.$refs.dialog.offsetHeight/2 + 'px'
     this.$refs.dialog.style.left= this.windowWidth / 2 - this.$refs.dialog.offsetWidth/2 + 'px'
    },
    _close() {
      this._beforeClose('close')
    },
    //关闭前的函数//如果有传回调函数就先暂停关闭dialog
    _beforeClose(type) {
      if(this.autoClose > 0) {
        clearInterval(this.clearTime)
      }
      if(typeof this.beforeClose === 'function'){
        this.beforeClose( type,this._hide)
      }else {
        this._hide()
      }
    },
    _hide() {
      //隐藏visble关闭dialog删除遮罩// 并且通过向父组件发送input时间改变v-modal的value为false,实现value父子组件双向绑定,方便父组件多次点击显示隐藏
      document.body.removeChild(document.querySelector(`.${prefixCls}-dialog-modal`))
      this.visible = false
      this.$emit('input', false)
      console.log(this.isAlert);
      if(this.isAlert) {
        //自定义全局组件命令时,隐藏时移除弹窗
        console.log(556);
        setTimeout(() => {
          if(this.$el && this.$el.parentNode){
            this.$el.parentNode.removeChild(this.$el)
          }
        }, 300);
      }
    },
   _confirm() {
      this._beforeClose('confirm')
   },
   _cancel() {
    this._beforeClose('cancel')
   },
   //点击遮罩关闭
   _modalClick() {
     this._hide()
   },
   //打开dialog
   open() {
    this.visible =true
    this._openModal()
   },
   //监听窗口变化改位置
   _resize() {
     this._getwindow()
     this._setPosition()
   },
   //自动关闭时间函数
   _autoClose() {
     let autoTime = this.autoClose
     if(autoTime > 0) {
        this.clearTime = setInterval(() => {
          if(autoTime> 1) {
            autoTime --
          }else {
            this._close()
          }
        }, 1000);
     }
   }
   
    
  },
  watch: {
    //监听prpos value为true是显示遮罩层并且把value给visible 让dialog显示
    value (v) {
      if (v) {
        this.$nextTick(function () {
          this._openModal()
        })
      }
       this.visible = v 
      }
  },
  
}
</script>

<style>
 
  
</style>