<template>
<transition name="fade">
  <div class="message" v-show="show">
    <i class="icon" :class="type"></i>
    <span class="text">{{text}}</span>
  </div>
  
  </transition>
</template>
<script>
export default {
  props: {
    text:String,
    type: {
      type:String,
      default:'info',
      validator: val=> ['info','success','warning','error'].includes(val)
    },
    show:{
      type: Boolean,
      default:false
    }
  }
}
</script>
<style lang="stylus">
.fade-enter-active,.fade-leave-active
  transition opacity  .3s
.fade-enter, .fade-leave-to
  opacity 0

.message
  width 200px
  height 100px
  position fixed
  top 40px
  text-align center
  left 50%
  transform translateX(-50%)
  padding 10px 20px
  font-size 14px
  background-color #f5f5f5
  z-index 1000
  border-radius 4px

</style>