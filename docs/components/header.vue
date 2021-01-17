<template>
  <div class="header-wrapper" :class="{'is-component':isComponent}">
    <div class="header">
      <div class="header-logo">
       <router-link to="/index" tag="a">
          <img width="145" src="../assets/logo-full.png" alt="">
       </router-link>
      </div>
      <div class="header-nav">
        <router-link to="/main/index" tag="a">组件</router-link>
        <a href="https://github.com/kanWohuilan/fun-ui.git">github地址</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isComponent:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style lang="stylus">
$color=#1BAABB
.header-wrapper
  position fixed
  height 80px
  width 100%
  left 0
  top 0
  z-index 100 
  background-color #fff
  &.is-component
    position relative
  .header
    margin 0 auto
    width 1100px
    height 100%
    border-bottom 1px solid #dcdfe6
    display flex
    align-items center
    justify-content space-between
    .header-logo
      a
        display block
    .header-nav
      padding 0 20px
      height 100%
      line-height 80px
      a
        display inline-block
        color #A9D5D8
        padding 0 15px
        line-height 80px
        position relative
        transition all .2s
        &.router-link-active
          color $color
        &:after
          position absolute
          top 50%
          right 0
          transform translateY(-50%)
          content ""
          width 1px
          height 35px
          background-color #dcdfe6
          display inline-block
        &:last-child
          &:after
            content none
          
        &:hover
          color $color

        
      
 
      

</style>