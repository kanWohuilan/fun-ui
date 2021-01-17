<!-- Created by 337547038 on 2018/8/22 0022. -->

# 使用

## 说明
> 注意：目前还没部署到*npm*暂时无法使用

## npm 安装
> 推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

`npm i fun-ui -S`
## 全局引入（推荐）
> 一般在 webpack 入口页面 main.js 中如下配置：
```javascript
import 'fun/lib/theme-chalk/index.css'
import Component from '../packages/index'
// 全局注册基础组件
Vue.use(Component)
```
## 按需引用
> 在当前页面import所需组件
```javascript
import Button from '../packages/button'
```