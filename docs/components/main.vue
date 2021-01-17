<template>
    <div class="main">
     <div class="main-wrapper">
        <div class="main-left">
        <div class="left-scroll" ref="leftScroll">
          
          <div class="left-view" ref="leftView">
            <ul>
              <li class="title">组件</li>
              <li v-for="(item,index) in components" :key="index">
                <router-link :to="'/main/'+ item.path">{{item.name}}</router-link>
              </li>
            </ul>
          </div>
          <div class="scrollbar-bar">
            <div class="scrollbar-thumb" ref="thumb" @mousedown="_thumbMousedown" @click.stop="_clickStop"></div>
          </div>
        </div>
      </div>
      <div class="main-content">
         <router-view class="animate"></router-view>
      </div>
     </div>
    </div>
</template>

<script>
import {components} from "../router/componentRouters"
export default {
  data() {
    return {
      components: components
    }
  },
  mounted() {
    this.$refs.leftScroll.addEventListener('scroll',this.setScrollthumb)
    console.log(this.components);
    let route = components.map((item)=> {
  return {path : item.path,component:item.component}
})
console.log(route);
  },
  methods: {
    _clickStop(e) {
      e.stopPropagation()
      e.preventDefault()
    },
    setScrollthumb() {
      let scrollTop = this.$refs.leftScroll.scrollTop * 0.53
      // console.log(this.$refs.leftScroll.scrollTop);
      this.$refs.thumb.style.transform = `translateY(${scrollTop}%)`
    },
    _thumbMousedown(e) {
      let pageY1 = e.pageY
      console.log(pageY1);
      //移动距离为当前tanslate + 鼠标按住滑动的距离
      let oldTranslateY = Number(this.$refs.thumb.style.transform.toString().slice(11,-2))
        console.log(oldTranslateY);
      let getmove = (event)=>{
      let t = event.pageY-pageY1

      let thumbTranslateY = oldTranslateY+ t
        console.log(t);
        if(thumbTranslateY<0) {
          thumbTranslateY= 0
        }
        if(thumbTranslateY>390) {
          thumbTranslateY=390
        }
        //移动的时候始终显示滑块
        this.$refs.thumb.style.opacity="1"
        //获取滚动内容最大可滚动长度
        let maxScrollTop = this.$refs.leftView.offsetHeight - this.$refs.leftScroll.offsetHeight
        console.log(maxScrollTop);
        this.$refs.leftScroll.scrollTop = thumbTranslateY/390 * maxScrollTop
    
        this.$refs.thumb.style.transform = `translateY(${thumbTranslateY}%)`
        console.log(this.$refs.thumb.style.transform);
      }
      e.preventDefault()
      document.body.addEventListener('mousemove',getmove)
      //鼠标抬起结束动画删除move事件
      document.addEventListener('mouseup' ,(e) => {
        //滑动结束删除elementStyle样式,还原css样式//防止滑块始终显示
        if(this.$refs.thumb.style.opacity !== undefined) {
          this.$refs.thumb.style.opacity= null
        }
        // this.$nextTick(()=> {
        //   this.$refs.thumb.style.opacity= null
        // })
        document.body.removeEventListener('mousemove',getmove)
        // document.removeEventListener('mouseup')
        e.preventDefault()
        e.stopPropagation()        
      })
     
    },
    mouseMove(view){
      return view.clientHeight

    }
  },
}
</script>

<style lang="stylus">

$color=#1BAABB
.main
  margin-top 80px
  height 100%
 .main-wrapper
    width 1100px
    height 100%
    margin 0 auto
    .main-left
      position fixed
      top 80px
      bottom 0
      width 240px
      .left-scroll
        height 100%
        overflow-x: hidden;
        overflow-y: auto;
        &:hover
          .scrollbar-bar
            .scrollbar-thumb
              opacity 1
        .left-view
          padding-top 25px
          padding-bottom 25px
          overflow hidden
          ul
            margin 0
            padding 0
            height 100%
            li
              font-size 14px
              height 40px
              line-height 40px
              cursor pointer
              color #444
              a
                height 40px
                display block
                // padding-left 10px
              .router-link-active
                color $color
                // border-left: 2px solid $color !important
                // padding-left 8px
            .title
              font-size 16px
              font-weight 600
              color #333
              
        .scrollbar-bar
          position absolute
          right 0px
          top 2px
          bottom 2px
          width 6px
          z-index 10
          background-color #ffffff
          .scrollbar-thumb
            height 20%
            width 100%
            border-radius 3px
            background-color #ddd
            opacity 0
            transition all .2s
            cursor pointer
            &:hover
              background-color rgba(0,0,0,.3)
    .main-content
      margin-right: 20px
      padding-left 280px
      padding-top 40px
      padding-bottom 100px
      // .space
      //   height 80px
      //   background-color #fff


/* 定义滚动条样式 */

/*滚动条样式*/
//原生滚动条不显示
.left-scroll::-webkit-scrollbar {
    display none
    // width: 4px;    
    // /*height: 4px;*/
    // background: #fff
}
// .left-scroll::-webkit-scrollbar-thumb {
//     border-radius: 10px;
//     -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
//     background: rgba(0,0,0,0.2);
//     height 10px
// }
// .left-scroll::-webkit-scrollbar-track {
//     -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
//     border-radius: 0;
//     background: #fff

// }

.hljs{
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #fff;
}
  .hljs,
  .hljs-subst{
    color: #000;
  }
  .hljs-string,
  .hljs-meta,
  .hljs-symbol,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-addition{
    color: #756bb1;
  }
  .hljs-comment,
  .hljs-quote{
    color: #636363;
  }
  .hljs-number,
  .hljs-regexp,
  .hljs-literal,
  .hljs-bullet,
  .hljs-link{
    color: #31a354;
  }
  .hljs-deletion,
  .hljs-variable{
    color: #88f;
  }
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-title,
  .hljs-section,
  .hljs-built_in,
  .hljs-doctag,
  .hljs-type,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-strong{
    color: #3182bd;
  }
  .hljs-emphasis{
    font-style: italic;
  }
  .hljs-attribute{
    color: #e6550d;
  }
  code{
    font-family: Menlo,Monaco,Consolas,Courier,monospace
  }
  // body{
  //   margin: 0;
  //   padding: 0;
  //   font-family: Microsoft YaHei;
  // }
  // body, div, ul, li, p{margin: 0;padding: 0}
  // // .main-left .router-link-active{
  // //   color: #41a259 !important;
  // //   background-color: #eeffde !important;
  // //   border-right: 3px solid #41a259 !important;
  // // }
  // #app{
  //   overflow: hidden;
  //   padding: 0;
  //   width: 100%;
  // }
  #app .main-header{
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    -webkit-box-shadow: 0 2px 8px #f0f1f2;
    box-shadow: 0 2px 8px #f0f1f2;
    position: fixed;width: 100%;z-index: 50;
    height: 65px;
    color: #444;
    background: #fff;
  }
  #app .main-header .main-header-logo{
    height: 100%;
    float: left;
    margin-left: 40px;
    position: absolute;
  }
  #app .main-header .main-header-logo img{
    height: 30px;
    width: auto;
    border: 0;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  #app .main-header .main-header-title{
    height: 65px;
    line-height: 65px;
    font-size: 25px;
    display: inline-block;
    padding-left: 75px;
    font-weight: bold;
  }
  #app .main-header .main-header-title a{font-size: 25px;text-decoration: none;color: #444;}
  #app .main-header .main-header-nav{
    float: right;
    height: 65px;
    background: transparent;
    margin-right: 120px;
  }
  #app .main-header .main-header-nav li{
    list-style: none;
    color: #314659;
    height: 100%;
    line-height: 65px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    min-width: 72px;
    border-top: 2px solid transparent;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    float: left;
    border-bottom: 3px solid #fff;
    -webkit-transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  #app .main-header .main-header-nav li a{
    color: #314659;font-size: 15px;text-decoration: none;
  }
  #app .main-header .main-header-nav li.active{
    color: #41a259;
    border-bottom: 3px solid #41a259;
  }
  #app .main-{
    position: relative;
    padding: 85px 0 0 180px;
    margin-left: 0;
    margin-right: 0;
    height: auto;
    zoom: 1;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 30px;
    overflow: hidden;
  }
  #app .main- .main-left{
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    position: fixed;
    width: 180px;left: 0;top:85px;
  }
  #app .main- .main-left ul{
    width: 180px;
    margin: 0;
    padding: 0;
  }
  #app .main- .main-left ul li{
    margin: 0;
    list-style: none;
    padding: 0;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  #app .main- .main-left ul li a{
    font-size: 16px;
    color: #333;
    line-height: 30px;
    height: 30px;
    margin: 0;
    padding: 4px 25px;
    text-decoration: none;
    display: block;
    position: relative;
    -webkit-transition: 0.15s ease-out;
    transition: 0.15s ease-out;
    border-right: 1px solid #e8e8e8;
  }
  #app .main- .main-left ul li a:hover{
    color: #41a259;
  }
  #app .main- .main-left ul li.main--link-group{
    height: auto;
  }
  #app .main- .main-left ul li.main--link-group a:hover{
    color: #333;
    cursor: default;
  }
  #app .main- .main-left ul li.main--link-group ul a{
    display: block;
    height: 40px;
    color: #444;
    line-height: 40px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
  }
  #app .main- .main-left ul li.main--link-group ul a:hover{
    color: #41a259;
    cursor: pointer;
  }
  #app .main- .main-right{
    padding: 0 84px 140px 64px;
    min-height: 500px;
    overflow: hidden;
  }
  /*#app .main- .main-right a{
    color: #41a259;
    text-decoration: none;
  }*/
  section h1{
    color: #0d1a26;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 8px;
    font-size: 30px;
    line-height: 38px;
  }
  section h2,
  section h3,
  section h4,
  section h5,
  section h6{
    font-family: Lato;
    margin: 1.6em 0 0.6em;
    font-weight: 500;
    clear: both;
  }
  section h3{
    font-weight 500
    font-size: 18px;
  }
  section h4{
    font-size: 16px;
  }
  section h5{
    font-size: 14px;
  }
  section h6{
    font-size: 12px;
  }
  section p,
  section pre{}
  section ul > li > p,
  section ol > li > p{
    margin: 0.2em 0;
  }
  section ul{
    padding: 0;
    margin: 0;
  }
  section p:nth-of-type(1) {
    color #5d5d5d
  }
  /*section ul > li{
    list-style-type: circle;
    margin-left: 20px;
    padding-left: 4px;
    padding-top: 15px;
  }
  section ol > li{markdown>table th
    list-style-type: decimal;
    margin-left: 20px;
    padding-left: 4px;
    padding-top: 15px;
  }*/
  section > table{
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #ebedf0;
    width: 100%;
    margin: 8px 0 16px;
  }
  section > table th,
  section > table td{
    color: #314659;
    border: 1px solid #ebedf0;
    text-align: left;
    padding: 10px 15px;
  }
  section > table th{
    white-space: nowrap;
    color: #5c6b77;
    font-weight: 500;
    background: rgba(0, 0, 0, 0.02);
  }
  section strong,
  section b{
    font-weight: 500;
  }
  section .sh-markdown-permalink{
    opacity: 0;
  }
  section h1:hover .sh-markdown-permalink,
  section h2:hover .sh-markdown-permalink,
  section h3:hover .sh-markdown-permalink,
  section h4:hover .sh-markdown-permalink,
  section h5:hover .sh-markdown-permalink,
  section h6:hover .sh-markdown-permalink{
    opacity: 1;
    display: inline-block;
  }
  section > br,
  section p > br{
    clear: both;
  }
  section blockquote{
    font-size: 90%;
    color: #0d1a26;
    border-left: 4px solid #ebedf0;
    padding-left: 0.8em;
    margin: 1em 0;
  }
  section blockquote p{
    margin: 0;
  }
  section hr{
    height: 1px;
    border: 0;
    background: #ebedf0;
    clear: both;
  }
  section code{color: #444;background-color: #e6effb;margin: 0 4px;display: inline-block;padding: 3px 7px;border-radius: 3px;font-family: Menlo, Monaco, Consolas, Courier, monospace;font-size: 14px;line-height: 20px}
  section pre{margin: 0;padding: 0;}
  section pre code{line-height: 22px;padding: 10px;margin: 0;white-space: pre-wrap; word-wrap: break-word;}
  #app .fixed-bottom{position: fixed;left: 5px;bottom: 5px;width: 20px;height: 15px;cursor: pointer;border-top: 4px solid #41a259;border-bottom: 4px solid #41a259;}
  #app .fixed-bottom:after{content: '';display: block;width: 100%;height: 4px; background: #41a259;position: relative;top: 5px;}
  /*锚点*/
  #app .header-anchor{color: #41a259;text-decoration: none;opacity: 0;display: none}
  #app h2:hover .header-anchor, #app h3:hover .header-anchor{opacity: 1}
  #app .container-nav{position: fixed;right: 20px;top: 85px;background: #fff;z-index: 20;box-shadow: 0 0 10px #ddd;padding: 8px;}
  #app .container-nav li ul{padding-left: 10px;}
  #app .container-nav li{list-style: none;margin: 0;padding: 0;line-height: 25px;}
  #app .container-nav li:before{content: '．';display: inline-block; vertical-align: middle;color: #999;font-size: 10px;}
  #app .container-nav li a{font-size: 14px;text-decoration: none;display: inline-block;vertical-align: middle;color: #666}
  #app .container-nav li a:hover{color: #41a259}
  /*关闭右则导航*/
  .close-nav{position: fixed;right: 20px;top: 60px;z-index: 21;width: 16px;height: 16px;cursor: pointer}
  .close-nav:before{content: '';display: block;width: 2px;background: #41a259;height: 16px;position: relative;left: 8px;top: 0;transform: rotate(45deg)}
  .close-nav:after{content: '';display: block;width: 100%;height: 2px;background: #41a259;position: relative;left: 0;top: -9px;transform: rotate(45deg)}
  .green{color: #41a259}
  .green:hover{text-decoration: underline;cursor: pointer}
</style>
<style lang="stylus">
.animate
  animation main 1s ease

@keyframes main
  0% { opacity : 0; transform: translateX(10px) }
  100% { opacity :1; transform: none }

//  .main-enter-active{
//     transition: all 1.2s ease;
//   }
//   .main-leave-active{
//     transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
//   }
//   .main-enter, .main-leave-to{
//     transform: translateX(10px);
//     opacity: 0;
//   }
</style>