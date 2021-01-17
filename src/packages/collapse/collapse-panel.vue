<template>
  <div class="collapse-panel">
    <div class="collapse-title" @click="_slideToggle">
      <slot> </slot>
    </div>
      <CollapseTransition>
      <div class="collapse-content" v-show="visible">
        <slot name="content"> </slot>
        </div> 
      </CollapseTransition>
  </div>
</template>

<script>
import {prefixCls} from '../prefixCls'
import CollapseTransition from "./transition"
// import {prefixCls} from '../prefixCls'
export default {
   name:`${prefixCls}-collapse-panel`,
  data() {
    return{
      randomName:  this.name || Math.random().toString(36).substr(2, 8)
    }
  },
  components:{
    CollapseTransition
  },
  props: ['name'],
  methods: {
    
    _slideToggle() {
      const Index = this.$parent.active.indexOf(this.randomName)
    //点击展开
      if(Index === -1) {
        //只允许展开一个 
        if(this.$parent.accordion){
        this.$parent.active = [],
        this.$parent.active.push(this.randomName)
        }else{
        this.$parent.active.push(this.randomName)
        }
        //点击收回
      }else {
        this.$parent.active.splice(Index,1)      
     }
     //触发标签改变的回调函数
     this.$parent._change(this.randomName)
    }
  },
  computed: {
    visible() {
      return this.$parent.active.indexOf(this.randomName) !== -1
    }
  }
}
</script>

<style>
 
</style>