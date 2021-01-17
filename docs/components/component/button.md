
# Button 按钮
button按钮组件




### 基础用法
基础的按钮用法。实际应用中存在着多种宽高，可通过添加样式进行控制
>

:::demo 通过使用`type`、`round`和来给`Button`添加不同的样式。常见的`确认`和`取消`两种

```html
<template>
  <div style="display:flex">
    <div style="margin-right: 20px; display:flex; flex-direction:column;" >
      <fun-button style="margin-bottom: 10px">默认按钮</fun-button>
      <fun-button type="primary" href="http://www.baidu.com" target="_blank">确认按钮</fun-button>
    </div>
    <div style="margin-right: 20px; display:flex; flex-direction:column">
      <fun-button :round="true"  style="margin-bottom: 10px">圆角按钮</fun-button>
      <fun-button type="primary" :round="true">圆角按钮</fun-button>
    </div>
    <div style="margin-right: 20px; display:flex; flex-direction:column;">
      <fun-button  style="margin-bottom: 10px" >默认按钮</fun-button>
      <fun-button type="plain" >默认按钮</fun-button>
    </div>
  </div>
</template>
```

:::

### 禁用按钮
:::demo 禁用按钮
```html
<template>
  <div > 
      <fun-button :disabled="true" style="margin-right:20px">默认按钮</fun-button>
      <fun-button type="primary" :disabled="true">确认按钮</fun-button>
  </div>
</template>

```
:::

## API
### Button
|参数|类型|说明|
|-|-|-|
|type           | String         |按钮类型|
|round          | boolean/false  |是否圆角按钮|
|routerTo       | String         |路由url|
|disabled       | boolean/false  |是否禁用状态|
|icon           | String         |前缀icon|

### Button Event
|参数|说明|
|-|-|
|click          | -|
