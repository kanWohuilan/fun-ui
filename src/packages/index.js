//组件入口
import Botton from "./button"
import Switch from "./switch"
import BackTop from "./backTop"
import Slider from './slider'
import {Tab,TabPane} from './tabs'
import Dialog from './dialog'
import $dialog from './dialog/dialog'
import Input from './input'
import Tooltip from './tooltip'
import badge from './badge'
import pagination from './pagination'
import {breadcrumb,breadcrumbItem} from './breadcrumb'
import {collapse,collapsePanel} from './collapse'
import {swiper,swiperItem} from './swiper'
import select from './select'
import {checkbox,checkboxGroup} from './checkbox'
import waterfall from './waterfall'


const component = [
  Botton,
  Switch,
  BackTop,
  Slider,
  Tab,TabPane,
  Dialog,
  Input,
  Tooltip,
  swiper,swiperItem,
  badge,
  pagination,
  breadcrumb,breadcrumbItem,
  collapse,collapsePanel,
  select,
  checkbox,checkboxGroup,
  waterfall
  
]


const install = function (Vue) {
  component.forEach((item)=> {
    Vue.component(item.name,item)
  })
  Vue.prototype.$dialog= $dialog
}
export default install

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}