import Message from './message.vue'

const MESSAGE = {

  duration:1000, //显示默认时间
  animateTime:300,//动画默认时间
  //创建install方法 Vue.use自动调用install方法并传入Vue参数 
  install(Vue){
    Vue.component('Message',Message)
    function msg(text) {
      let msg
      let duration = MESSAGE.duration
      msg = text
    //创建组件构造器
    let VueMessage = Vue.extend(
      //用渲染函数创建组件 相当于template模板,导入text,show 是模板或者dom上需要的attr参数
      {render(h) {
      return h('Message',{props:{
        text:msg,
        show:this.show
      }})
    },
    //组件的选项,show是默认隐藏显示
    data() {
      return {
        show:false
      }
    },} )
    //创建组件构造器dom
    let newMessage = new VueMessage().$mount()
    //添加到dom中
    document.body.appendChild(newMessage.$el)
    //打开
    newMessage.show = true
    console.log(newMessage);
    //关闭
    let t1 = setTimeout(() => {
      clearTimeout(t2)
      newMessage.show =false
      //删除dom
      let t2 =setTimeout(() => {
        clearTimeout(t1)
        document.body.removeChild(newMessage.$el)
        //销毁组件
        newMessage=null

      }, this.animateTime);
    }, duration);
  }
  //将组件挂在vue原型上
  Vue.prototype.$message = msg
  }
}
export default MESSAGE