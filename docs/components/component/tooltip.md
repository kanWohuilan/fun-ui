<!-- Created by 337547038 on 2019/9/19 0019. -->
# Tooltip 提示

### 基本用法
:::demo 
```html
<template>
  <div style="display: flex;  flex-wrap: wrap ;flex-direction: column; width:280px" >
    <div style="flex:1;display: flex;justify-content: space-between;margin-bottom:20px" >
       <fun-tooltip content="这是提示内容这是提示内容" direction="top-left"><fun-button >上左</fun-button></fun-tooltip>
       <fun-tooltip content="这是提示内容这是提示内容" direction="top"><fun-button >上边</fun-button></fun-tooltip>
       <fun-tooltip content="这是提示内容这是提示内容" direction="top-right"><fun-button >上右</fun-button></fun-tooltip>
     </div>
     <div style="flex:1;display: flex ;justify-content: space-between;margin-bottom:20px">
       <fun-tooltip content="这是提示内容这是提示内容" direction="left"><fun-button >左边</fun-button></fun-tooltip>
       <fun-tooltip content="这是提示内容这是提示内容" direction="right"><fun-button >右边</fun-button></fun-tooltip>
     </div>
     <div style="flex:1;display: flex;justify-content: space-between">
       <fun-tooltip content="这是提示内容这是提示内容" direction="bottom-left"><fun-button >下左</fun-button></fun-tooltip>
       <fun-tooltip content="这是提示内容这是提示内容"  direction="bottom"><fun-button >下边</fun-button></fun-tooltip>
       <fun-tooltip content="这是提示内容这是提示内容"  direction="bottom-right"><fun-button >下右</fun-button></fun-tooltip>
     </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>
<style>
  /* .tooltip-demo{margin-bottom: 30px}
  .tooltip-demo span{
    display: inline-block;
    vertical-align: middle;
    width: 55px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #f7f7f7;
    border: 1px solid #dddee1;
    border-radius: 3px;
    cursor: pointer;
    transition: all .5s;
    margin-right: 30px}
  .tooltip-demo span:hover {
    background: #fff;
    border-color: #36a1d3;}
  .tooltip-icon {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-style: normal;
    background: #ddd;
    display: inline-block;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 30px} 
  .tooltip-align{color: red;background: #66b1ff}   */
</style>

```
:::

<!-- ### 多文字自动换行
:::demo 可通过设置最大宽度自动换行
```html
<template>
  <div>
    <div class="tooltip-demo">
       <fun-tooltip content="提示语的左边位置跟当前标签对齐，如提示语X轴位置到浏览器右边的距离小于最大宽，将以最小宽显示并换行"><span>上左</span></fun-tooltip>
       <fun-tooltip content="上边提示是根据是根据当前标签中间位置，向左偏移50%实现居中，如果当前标签到浏览器右边的距离小于最大宽时，实际显示宽为到边浏览器右边的距离，并不是最大宽" direction="top"><span>上边</span></fun-tooltip>
       <fun-tooltip content="这里跟上左类型，计算的是到浏览器左边的距离" direction="top-right" :maxWidth="200"><span>上右</span></fun-tooltip>
    </div>
    <div class="tooltip-demo">
       <fun-tooltip direction="left" content="受当前标签到浏览器左边的距离影响">
          <span>左边</span>
       </fun-tooltip>
       <span></span>
       <fun-tooltip direction="right" content="受当前标签到浏览器左边的距离影响" :maxWidth="200"><span>右边</span></fun-tooltip>
    </div>
    <div class="tooltip-demo">
       <fun-tooltip direction="bottom-left" content="这是提示内容，如果内容超过设定的最大宽时则自动换行。"><span>下左</span></fun-tooltip>
       <fun-tooltip direction="bottom" content="这是提示内容，如果内容超过设定的最大宽时则自动换行。如果内容超过设定的最大宽时则自动换行"><span>下边</span></fun-tooltip>
       <fun-tooltip direction="bottom-right" content="这是提示内容，如果内容超过设定的最大宽时则自动换行。这是提示内容，如果内容超过设定的最大宽时则自动换行。"><span>下右</span></fun-tooltip>
    </div>
</div>
</template>

```
:::

### 支持多种效果
:::demo 可自定样式
```html
<template>
  <div>
    <fun-tooltip content="这里是提示文字，因为icon比较小，这个方向箭头明显是没有对齐的">
    <i class="tooltip-icon">?</i>
    </fun-tooltip>
    <fun-tooltip content="这里是提示文字。解决的办法就是添类名，修改样式。这里顺便把外观也给改下" className="tooltip-align"><i class="tooltip-icon">?</i></fun-tooltip>
  </div>
</template>

```
:::-->

### 固定显示
:::demo 
```html
<template>
  <div class="tooltip-demo">
    <fun-tooltip content="一直都显示的" :always="true" direction="top">
       <fun-button >always</fun-button>
    </fun-tooltip>
  </div>
</template>

```
::: 

### Tooltip
|参数|类型|说明|
|-|-|-|
|content        | String         |显示的内容|
|direction      | String         |显示方向。分top-left、top、top-right、left、right、bottom-left、bottom、bottom-right共8个方向|
|maxWidth       | Number/500     |最大显示宽|
|delay          | Number/200     |延时关闭时间，单位毫秒。主要是为了能让鼠标移到提示文字上面，实现点链接等|
|always         |Boolean/false    |是否总是可见|
