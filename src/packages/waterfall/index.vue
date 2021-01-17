<template>
  <div :class="`${prefixCls}-waterfall`" >
    <div class="waterfall-content" ref="content">
        <slot> </slot>
    </div>
  </div>
</template>

<script>
import {prefixCls} from "../prefixCls"
export default {
  name:`${prefixCls}-waterfall`,
data() {
  return {
    prefixCls:prefixCls
  }
},
props: {
//列数
  columnNum:{
    type:Number,
    default: 6
  },
  //列间距
  columnSpace: {
    type:Number,
    default: 8
  },
  //行间距
  rowSpace: {
    type:Number,
    default: 8
  },
},
methods: {
  setWater() {
    let column=this.columnNum
    let cards = this.$refs.content.children
    let cardWidth = cards[0].offsetWidth
    let arr = []
    //第一行top 0,left按此排序
    for(let i=0;i<cards.length;i++) {
      cards[i].style.position='absolute'
      if(i<column) {
        cards[i].style.top=0
        cards[i].style.left = (cardWidth+this.columnSpace) * i +'px'
        arr.push(cards[i].offsetHeight)
      }else {
        //找到第一行中高度最小的元素
        let minHeight = arr[0]
        let index = 0
        for (let j = 0; j < arr.length; j++) {
          if(minHeight > arr[j]) {
            minHeight =arr[j]
            index = j
          }
        }
        //超过第一行的元素top =第一行(arr)高度最小的高度 left=第一行(arr)高度最小的offsetLeft
        cards[i].style.top = this.rowSpace+minHeight+'px'
        cards[i].style.left = cards[index].offsetLeft +'px'
        //每给一列加一个元素,第一行(arr)该列的高度自动加上该元素的高度
        arr[index] = arr[index] + cards[i].offsetHeight+this.rowSpace
      }
    }
    //让父元素占位
    let allHeight =Math.max(...arr)
    this.$refs.content.style.height = allHeight +'px'
  }
},
mounted() {
  this.setWater()
}
}
</script>

<style>

</style>