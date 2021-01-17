<!--<template>
  <div :class="`${prefixCls}-tabs`">
    <div class="tabs-nav">
      <div
        class="tab-tab"
        :class="{ active: active === item.tabName }"
        v-for="(item, index) in panes"
        :key="index"
        @click="tabClick(item, index, $event)"
      >
        {{item.label || item.$slots.label}}
         
     
      </div>
    </div>
    <div class="tabs-content" ref="content">
      <slot> </slot>
    </div>
  </div>
</template> -->

<script>
import { prefixCls } from "../prefixCls";
export default {
  name: `${prefixCls}-tabs`,
  data() {
    return {
      prefixCls: prefixCls,
      panes: [],//子组件pane的dom数组
      active: this.value, //选中标签的name值
    };
  },
  props: {
    //v-model的值决定选中项
    value: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    //双向绑定v-model
    value(nv) {
      this.active = nv;
    },
    active(nv) {
      this.$emit("input", nv);
    },
  },
  methods: {
    tabClick(pane,index) {
      if (!this.disabled) {
        this.active = pane.tabName;
        //标签改变事件,接受改变后的index,pane  pane为对应内容的dom
        this.$emit('change',pane,index)
      }
    },
  },
  computed: {},
  mounted() {
    console.log(this.panes);
  },
  render() {
       //使用渲染函数实现子组件pane插槽渲染在父组件nav上
    return (
      <div class={`${prefixCls}-tabs`}>
        <div class="tabs-nav">
        {/*渲染函数中的v-for使用数组.map*/}
          {this.panes.map((pane,index) => {
            return (
              <div
                class= {{"active": this.active === pane.tabName, "tabs-tab": true}}
                onClick = {(e)=> {this.tabClick(  pane ,index,e)}}
              >
                {/**子组件props[label]或者自定义内容添加到具名插槽label上 */}
              {pane.$slots.label || pane.label}
              </div>
            );
          })}
          </div>
          <div class="tabs-content">
             {this.$slots.default}
          </div>
        
      </div>
    );
  },
};
</script>

<style>
</style>