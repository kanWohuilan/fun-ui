<template>
  <div class="aa">
    <!-- <tton @click="visible1 = true" type='primary' >111</tton>
<dialo v-model= 'visible1' title='kai'  >111</dialo>
<dot class="aaa"  value='aaa' :max='9'>11 </dot>

<breadcrumb separator="/">
<breadcrumb-item >啊啊啊啊 </breadcrumb-item> 
<breadcrumb-item >11 </breadcrumb-item> 
<breadcrumb-item >11 </breadcrumb-item> 
</breadcrumb>
<p><checkbox v-model="visible2" class="vv" > adad</checkbox></p>
<back> </back>
<slider @change="change" class="aaa" v-model="valu"> </slider> -->
    <!-- <swiper>
<swiper-item></swiper-item> 
<swiper-item> </swiper-item> 
<swiper-item> </swiper-item> 
</swiper> -->

    <Switch1> </Switch1>
    <toolTip content="jdd" class="aaa" :always="true">
      <span>123</span></toolTip
    >
    <collapse>
      <collapsePanel>
        2222 <template slot="content"> 333</template></collapsePanel
      >
      <collapsePanel>
        2222 <template slot="content"> 333</template></collapsePanel
      >
      <collapsePanel>
        2222 <template slot="content"> 333</template></collapsePanel
      >
    </collapse>
    <Tab v-model="tab">
      <TabPane label="111" name="111"> 111</TabPane>
      <TabPane name="222"><span slot="label">5555555</span>222</TabPane>
      <TabPane name="333" label="333"> 333</TabPane></Tab
    >
    <Select :options="['111','222','333','444','555','666']"  v-model="val"  placeholder="请输入"></Select>
  </div>
</template>

<script>
// import tton from '../packages/button'
// import dialo from '../packages/dialog'
// import back from '../packages/backTop'
// import dot from '../packages/badge'
// import {breadcrumb,breadcrumbItem} from '../packages/breadcrumb'
// import checkbox from '../packages/checkbox/checkbox.vue'
// import slider from '../packages/slider'
// import {swiper, swiperItem} from '../packages/swiper'
// import Swiper from '../packages/swiper/swiper.vue'
// import SwiperItem from '../packages/swiper/swiper-item.vue'
import Switch1 from "../packages/switch";
import toolTip from "../packages/tooltip";
import { collapse, collapsePanel } from "../packages/collapse";
import { Tab, TabPane } from "../packages/tabs";
import Select from "../packages/select";

export default {
  data() {
    return {
      visible1: false,
      visible2: false,
      valu: 55,
      tab: "111",
      val:'111'
    };
  },
  methods: {
    change(value) {
      console.log(value);
    },
  },
  components: {
    //   tton,
    // dialo,
    // back,
    // dot,
    // breadcrumb,
    // breadcrumbItem,
    // checkbox,
    // slider,
    // swiper, swiperItem,
    // Swiper,
    // SwiperItem,
    Switch1,
    toolTip,
    collapse,
    collapsePanel,
    Tab,
    TabPane,
    Select,
  },
};
</script>
<style lang="stylus" scoped>
.aaa {
  margin-top: 50px;
}
</style>