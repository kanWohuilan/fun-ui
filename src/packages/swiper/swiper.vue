<!--思路:当触发从最后一张往下一张滚的时候,把第一张translate移动到最后一张后面,滚动动画结束后再把这张图片复原 current也复原并根据current不用动画滚到current页-->
<template>
  <div :class="`${prefixCls}-swiper`" ref="container" @touchstart="_touchstart" @touchmove="_touchmove" @touchend="_touchend" @mouseover="_mouseenter" @mouseleave="_mouseLeave">
    <div  class="swiper-wrapper" :style="swiperStyle" ref="Wrapper">
      <slot> </slot>
    </div>
    <div class="direction-nav" v-if="directionNav">
      <a href="javascript:;" class="prev" @click="_directionNavClick(-1)"></a>
      <a href="javascript:;" class="next" @click="_directionNavClick(1)"></a>
    </div>
    <div class="control-dots" v-if="showDots">
        <a href="javascript:;" v-for="(item,index) in swipers" :key="index" :class="{'active': index===current}" @click="clickDot(index)"></a>
    </div>
  </div>
</template>

<script>


import {prefixCls} from '../prefixCls'
export default {
  name:`${prefixCls}-swiper`,
  data() {
    return {
      prefixCls:prefixCls,
      translate: 0,//移动距离,
      duration2: 500,//切换时间,
      swipers: [],
      containerHeight: '',
      containerwidth: '',
      current: 0,//当前是图片index
      touchX:0,//触摸点的位置
    }
  },
  props: {
    active:{
      type:Number,
      default: 0
    },
    //自动播放间隔时间
    showTime: {
      type:Number,
      default: 2000
    },
    //是否开启自动播放
    autoPlay: {
      type:Boolean,
      default: false
    },
     distance: {// 手指滑动的阈值
      type: Number,
      default: 50
    },
     duration: {// 滚动或者过渡时间，单位毫秒
      type: Number,
      default: 1000
    },
    //是否显示小圆点
    showDots: {
      type:Boolean,
      default: true
    },
     directionNav: { // 显示前后控制
      type: Boolean,
      default: true
    },
    touch: { // 允许触摸
      type: Boolean,
      default: false
    },
  },
  methods: {
    clickDot(index){
      this.current =index
      this._translate(index)
    },
    _mouseLeave () {
      this._autoPlay()
    },
    _mouseenter() {
      if(this.autoPlay) {
        clearInterval(this.timer)
      }
    },
    _autoPlay() {
      if(this.autoPlay) {
        this.timer = setInterval(() => {
          this._directionNavClick(1)
        }, this.showTime);
      }
    },
    //根据current改变移动图片方法
    _directionNavClick(direction) {
      let item = this.setItem(direction)
      let movefirstLast = item[0]
      let index =item[1]
      
      this.current = this.current + direction
      console.log(this.current)
         this._translate(this.current)
         console.log(this.translate);
      if(movefirstLast) {
        
       this.current = index
          
         
       setTimeout(() => {
           this.swipers[index].style.transform= `translateX(0)`
         this._translate(index,0)
       
         
       },this.duration);
      }
       
      // }else{
      //   this.current = this.current + direction
      //  this._translate(this.current)
      // }
      

    },
    _touchstart(e) {
      console.log(e);
      this.touchX =e.touches[0].pageX
       e.preventDefault()
    },
    _touchmove(e) {
      const touchX2 = e.touches[0].pageX
      const deep = touchX2 - this.touchX
      console.log(deep);
      //当需要滚到循环时,设置循环页
      this.setItem(-deep)
      //手指还在触摸时,按滚动距离滚动整个轮播图
      this.translate = this.current*this.containerwidth - deep
        
    },
    _touchend(e) {
       console.log(e);
      const touchX2 = e.changedTouches[0].pageX
      const deep = touchX2 - this.touchX
      console.log(deep);
      //滑动距离大于阈值 滚动一页
      if(Math.abs(deep) > this.distance) {
        if(deep > 0) {
          this.current --
        }
        if(deep  < 0) {
          this.current ++
        }
        //滚到移动过的循环页时,取消动画把该页面位置和current复原,
        const len  = this.swipers.length-1
        if(this.current < 0){
            this.setCurrent(len)
        }
        if(this.current > len) {
          this.setCurrent(0)
        }
      }
      this._translate(this.current)

    },
    _translate(current,direction){
      this.duration2 = direction ===0 ? 0 : this.duration
      this.translate = current*this.containerwidth
      console.log(this.current);
    },
    //当滚动动画结束复原current和循环图片的位置
    setCurrent(current){
     setTimeout(() => {
        this.current = current
      this.swipers[current].style.transform= `translateX(0)`
      this._translate(this.current,0)
     }, this.duration);
    },
    //如果第一张往前或最后一张往后,设置轮播
    setItem(direction) {
      let len = this.swipers.length
      //需要移动图片的标记符
      let movefirstLast = false
      //最后一张或者第一张要移动的距离
      let offset = this.containerwidth* len
      // let offset1 = this.swipers[len-1].offsetLeft+this.containerwidth
      // let offset2 = this.swipers[0].offsetLeft - this.containerwidth
      //当前图片序号

      let index = this.current
      if(direction > 0 && this.current === len-1) {
        console.log(this.current);
       
        // this.$refs.Wrapper.children[0].offsetLeft = offset1
        this.swipers[0].style.transform= `translateX(${offset}px)`
         movefirstLast = true
        index = 0
      }
      if(direction < 0 && this.current ===0) {
       
        // this.$refs.Wrapper.children[len-1].offsetLeft = offset2
        this.swipers[len-1].style.transform= `translateX(-${offset}px)`
         movefirstLast =true
        index= len-1
      }
      return [movefirstLast,index]
    }
  },
  mounted() {
    setTimeout(() => {
      this.swipers = this.$refs.Wrapper.children
    this.containerHeight = this.$refs.container.clientHeight
    this.containerwidth = this.$refs.container.clientWidth
    this._translate(this.current)
    this._autoPlay()
    }, 20);
    
  },
  computed:{
    swiperStyle() {
      return {
        transform:`translate3d(${-this.translate}px,0,0)`,
        transition: `transform ${this.duration2}ms`,
        width: this.containerwidth * this.swipers.length + 'px'
      }
    }
  }
}
</script>

<style>

</style>