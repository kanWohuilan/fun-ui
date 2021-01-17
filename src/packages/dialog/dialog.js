import dialog from './index.vue'
import Vue from 'vue'
// import {prefixCls} from '../prefixCls'

const $dialog = function (propsData) {
  //创建组件构造器
   propsData = Object.assign({},{isAlert: true},propsData)
  let Message= Vue.extend(dialog)
  //根据构造器组件实例
  let component = new Message({
    propsData
  }).$mount()
  //组件添加到dom上
  console.log(component);
  document.body.appendChild(component.$el)
  component.open()
}

export default $dialog