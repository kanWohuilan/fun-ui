<template>
  <div :class="[`${prefixCls}-slider`, {disabled:disabled}]">
  <div :class="`${prefixCls}-slider-runway`" @click="_sliderClick">
    <span class="slider-control" :style="{left: `calc( ${this.startLeft}% - 8px)`}" @mousedown.self="_mousedown" @click.stop="_clickStop">
      <i v-if="showTooltip" class="slider-tooltip" > {{tooltipVal}}</i>
    </span>
    <span class="slider-bar" :style="sliderBarStyle" ref="bar">
      
    </span>
      <i class="slider-stop"  v-for="item in sliderStops" :key="item" :style="{left: item}"></i>
      <span class="slider-marks" v-for="item in markList" :key="item" :style="{left:item.left}" v-html="item.label" ></span>
  </div>
  </div>
</template>

<script>

import {prefixCls} from '../prefixCls'
export default {  
  name: `${prefixCls}-slider`,
 data() {
   return {
     prefixCls: prefixCls,
     startLeft: 0,//离开始的距离
   }
 },
 props: {
  value: {
    type: [String,Array,Number],//当前值
    default() {
      return ''
    }
  },
  min:{
    type: Number,
    default:0
  },
  max: {
    type: Number,
    default: 100
  },
  //步长,每步占总长度百分比整数
  step:{
    type: Number,
    default:1
  },
  disabled: {
      type: Boolean,
      default: false
    },
showStops: { // 是否显示间断点
      type: Boolean,
      default: false
    },
  showTooltip: { // 是否显示提示
      type: Boolean,
      default: true
    },
    marks:Object,//给进度条标记,key为位置,value为标记内容
    //格式化提示内容
    formatTooltip: Function
 },
 created() {
  this.startLeft = this.value
 },
 watch: {
  value(newv) {
    if(!newv) return
    this.startLeft = newv
  },
  startLeft(newv) {
    //输出的value取整
    let newvv = newv | 0
    this.$emit('input',newvv)
    this.$emit('change',newvv)
  }
 },
 methods: {
   //获取元素的偏移位置
   getOffset(el) {
    const componentRect = el.getBoundingClientRect()
    const left= componentRect.left+ window.pageXOffset
    const height = el.offsetHeight
    const width = el.offsetWidth
    return{left,height,width}
   },
   //点击时滑动到指定位置
   _sliderClick(e) {
     if(this.disabled) {
        return
      }
     //整个组件最左边距离浏览器最左边的距离
    const offsetLeft= this.getOffset(this.$el).left
    //当前点击位置所在百分比位置
    let percent = (e.pageX - offsetLeft)/this.$el.offsetWidth * 100
       // 定位到当前步数位置*每步所占的百分比
    let step = Math.round(percent / this.step)
      // 根据步长修改点击的位置，不能出现指定步长外的地方
      percent = step * this.getStepPercent(this.step)
    console.log(percent);
    this.startLeft = percent

   },
   //拖拽control
   _mousedown(e) {
      if(this.disabled) {
        return
      }
      //获取runway最左边离页面最左边的距离
      let t = e.pageX-e.target.offsetLeft
      document.onmousemove = ev => {
        e.target.style.transition = "none"
        this.$refs.bar.style.transition = "none"
        let distance = (ev.pageX-t)/this.$el.offsetWidth  * 100
        // console.log(distance)
        if (distance>100) {
          distance =100
        }
        if(distance < 0) {
          distance = 0
        } 

        // e.target.style.left = distance + '%'
        if (Math.round(distance) % this.getStepPercent(this.step) === 0) {
             this.startLeft =distance
        }
        }
        document.onmouseup = () => {
        // 鼠标弹起时，如果起始值大于终点值，则互换下
        
        document.onmousemove = null
        document.onmouseup = null
        e.target.style.transition = ".2s"
        this.$refs.bar.style.transition = ".2s"
      }
       e.preventDefault()
      e.stopPropagation()

        
   },
   //每步长占总长度的百分比
   getStepPercent(step) {
      return Math.round(100/((this.max-this.min)/step))
   },
   _clickStop(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    //将具体浮点数转为百分比整数
    _percentageToNumber(currentValue) {
      return Math.round((this.max - this.min) * currentValue / 100 + this.min)
    }

 },
 computed: {
   markList() {
      let list = []
      if(this.marks) {
      for(let i in this.marks) {
        list.push({
          left: i + '%',
          label: this.marks[i]
        })
      }
        
      }
      return list
   },
   sliderStops() {
     
      let stopList= []
      if(this.showStops) {
    const num = (this.max-this.min)/this.step
    for(let i=1;i<num;i++){
      stopList.push(i *100/num + '%')
    }
    }
    return stopList
   },
   sliderBarStyle() {
     return {
       left: '0px',
       width: this.startLeft + "%" 
     }
   },
   tooltipVal() {
     if(this.showTooltip) {
       const val = this._percentageToNumber(this.startLeft)
       return this.formatTooltip ?  this.formatTooltip(val) : val 
     }else {
       return ""
     }
   }
 }
}
</script>

<style>

</style>