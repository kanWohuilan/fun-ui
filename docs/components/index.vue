<template>
  <div class="index">
    <h1 class="animate__animated animate__backInLeft">我是一个首页</h1>
    <div class="button" >
      <fun-button icon="icon-star2" routerTo="/main/index" class="animate__animated animate__fadeIn"> 组件</fun-button>
      <a href="https://github.com/kanWohuilan/fun-ui.git">
      <fun-button icon="icon-github"  class="animate__animated animate__fadeIn"> Github</fun-button>
      </a>
      
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.index
  max-width 1200px
  margin 0 auto
  padding 60px 20px
  text-align center
  h1
    line-height 200px
    font-size 40px
    font-weight 700
  .button
    margin-top 50px
    button 
      box-shadow:  0 4px 6px -2px rgba(0, 0, 0, 0.1)
      margin 0 10px
      font-weight 500

</style>