<!-- Created by 337547038 on 2019/8/6 0006. -->
# Breadcrumb 面包屑
### 用法
:::demo 
```html
<template>
   <fun-breadcrumb  separator="/">
   <fun-breadcrumb-item :to="{ path: '/' }"> 首页 </fun-breadcrumb-item>
   <fun-breadcrumb-item> 首页 </fun-breadcrumb-item>
   <fun-breadcrumb-item> 首页 </fun-breadcrumb-item>
   <fun-breadcrumb-item> 首页 </fun-breadcrumb-item>
   </fun-breadcrumb>
</template>
<script>
 export default {
   data(){
     return {
      //  data:[
      //    {title:'首页',href:'/'},
      //    {title:'组件演示1',href:'/'},
      //    {title:'组件演示2',href:'/breadcrumb'},
      //    {title:'面包屑'}
      //  ]
     }
   }
 }
</script>
```
:::

## API
### BackTop
|参数|类型|说明|
|-|-|-|
|separator-class        | String          |图标分隔符 class|
|separator      | String         |分隔字符|

### data
|参数|类型|说明|
|-|-|-|
|to         | string/object        |路由跳转对象，同 vue-router 的 to|
|replace          | boolean         |开启路由跳转的replace方法|
