<template>
  <div :class="`${this.prefixCls}-page`">
    <div class="page-align">
      <div class="total" v-show="showTotal">共<span>{{total}}</span>条</div>
      <pSelect v-if="pageSizes.length > 0"  :options="selectOptions" v-model="currentSelectVal"/>
        <div class="page-list">
          <ul>
            <li class="prev" :class="{'disabled':active===1}" @click="_goTo(active-1)">
              <a href="javascript:;" title="上一页">&lt;</a>
            </li>
            <li  :class="{'active': active===1}" >
              <a href="javascript:;" @click="_goTo(1)" >1</a>
            </li>
             <li v-if="pageStart>2">
            <a href="javascript:;" :title="`向前${pagerCount}页`" class="jump-prev" @click="_goTo(active-pagerCount)" style="font-size:6px">• • •</a>
          </li>
            <li v-for="(page,index) in pages[0]" :key="index" :class="{'active': active===page}" >
              <a href="javascript:;" @click="_goTo(page)" >{{page}}</a>
            </li>
              <li v-if="pageCount>pageEnd+1">
            <a href="javascript:;" :title="`向后${pagerCount}页`" class="jump-next" @click="_goTo(active+pagerCount)" style="font-size:6px">• • •</a>
          </li>
            <li  :class="{'active': active===pageCount}" >
              <a href="javascript:;" @click="_goTo(pageCount)" >{{pageCount}}</a>
            </li>
            <li class="next" :class="{'disabled':pageCount<=active}" @click="_goTo(active+1)">
              <a href="javascript:;" title="下一页">&gt;</a>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
import {prefixCls} from '../prefixCls'
// import pInput from '../input/index'
import pSelect from '../select'
export default {
  name: `${prefixCls}-pagination`,
data() {
  return {
     currentSelectVal: `每页${this.pageSize}条`,
     prefixCls:prefixCls,
     //当前一页显示多少数据
     currentSelect: this.pageSize,
     //当前页
     active:this.current
  }
},
components: {
pSelect
},
props:{
  current: {
    type:Number,
    default:1
  },
  //总数据数
  total: {
    type:Number,
    default:0
  },
  //每页条数
  pageSize: {
    type: Number,
    default:20
  },
  //是否显示总数据数
  showTotal: {
    type:Boolean,
    default: true
  },
  //每页选择多少数据的选择器选项数组
  pageSizes: {
    type: Array,
    default() {
      return []
    }
  },
  //页码按钮的数量，当总页数超过该值时会折叠
   pagerCount: {
    type: Number,
    default:5
  },

},
watch: {
  //select切换更改每页显示数据数
  currentSelectVal(v) {
    if(v){
      let numArr = v.match(/\d+/g)
    this.currentSelect = numArr
    }
    
  }
},
computed: {
  pageEnd() {
      return this.pages[2]
    },
    pageStart() {
      // 页码循环开始和结束，用来判断前后的三个点链接显示
      return this.pages[1]
    },
  //总页数
  pages() {
      let start = ''
      let end = this.pageCount - 1

      if (this.active + parseInt(this.pagerCount / 2) < this.pageCount) {
        end = this.active + parseInt(this.pagerCount / 2)
      }

      if (this.active >= this.pagerCount) {
        start = this.active - parseInt(this.pagerCount / 2)
      } else {
        // 当前页小于pagerCount时
        end = this.pagerCount > this.pageCount ? this.pageCount : this.pagerCount
      }
      // 接近尾页时
      if (this.pageCount - this.active < this.pagerCount) {
        const fixedStart = this.pageCount - this.pagerCount + 1
        start = fixedStart > start ? start : fixedStart
      }
      if (start < 2) {
        start = 2
      }
      if (end >= this.pageCount - 1) {
        end = this.pageCount - 1
      }
      // 如果只有一页时
      let showPages = []
      let forStart = start
      while (forStart <= end) {
        showPages.push(forStart)
        forStart++
      }
      return [showPages, start, end]
    },
  pageCount() {
    return Math.ceil(this.total/this.currentSelect)
  },
  selectOptions() {
    let list = []
    this.pageSizes.forEach((item)=>{
      list.push(`每页${item}条`)
    })
    return list
  },
  
},
methods: {
  _goTo (page) {
    let newPage = page
    if(page < 1){
      newPage = 1
    }
    if(page > this.pageCount) {
      newPage = this.pageCount
    }
    this.active = newPage
  }
},
}
</script>

<style>

</style>