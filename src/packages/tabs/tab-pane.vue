<template>
  <div class="tab-pane" v-show="$parent.active === tabName">

    <slot> </slot>
  </div>
</template>


<script>
import {prefixCls} from "../prefixCls"
export default {
  name: `${prefixCls}-tab-pane`,
data() {
  return{
    tabName: this.name || this.label
  }
},
 props: {
   label: String,//标签名
   name: String//标签的标识用于相应选中标签
 },
 mounted() {
   this.$parent.panes.push(this)
 }
}
</script>

<style>

</style>