import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import animated from 'animate.css'
// import './stylus/index.stylus';
import './assets/iconfont/iconfont.css'
import '../src/stylus/index.stylus'
import component from '../src/packages/index'
import DemoBlock from './components/demo-block.vue'
import icontable from './components/table.vue'
Vue.use(component)
Vue.use(animated)
Vue.component('demo-block',DemoBlock)
Vue.component('icontable',icontable)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
