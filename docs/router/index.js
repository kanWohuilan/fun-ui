import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);
import {components} from "./componentRouters"
//按需配置所有组件的route
let route = components.map((item)=> {
  return {path : item.path,component:item.component}
})
export const router = new VueRouter({
  scrollBehavior: () => ({y: 0}),

  routes: [
    //默认显示index //主页默认显示button
    {path: '/', redirect: '/index',},
  
    { path: '/main', component: () => import('../components/main.vue'),children:[...route]},
    {path: '/index', component: () => import('../components/index.vue') },
    
  ]
});