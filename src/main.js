import Vue from 'vue'
import App from './App.vue'
import './stylus/index.stylus';
import './assets/iconfont/iconfont.css'
import component from './packages/index'
import Message from './packages/message.vue'

Vue.use(Message)
Vue.config.productionTip = false
Vue.use(component)
new Vue({
  render: h => h(App),
}).$mount('#app')
