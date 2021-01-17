<template>
  <div class="demo-block">
    <div class="demo-block-source1">
      <ul>
        <li v-for="item in iconList" :key="item">
          <i :class="item.icon"></i>
          <span>{{ item.icon }}</span>
          <span>{{ item.content }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      iconList: [
        { icon: "icon-arroww", content: "\\e630" },
        {
          icon: "icon-warning",
          content: "\\e66e",
        },
        {
          icon: "icon-success2",
          content: "\\e770",
        },
        {
          icon: "icon-user",
          content: "\\e851",
        },
        {
          icon: "icon-star2",
          content: "\\e642",
        },
        {
          icon: "icon-wechat",
          content: "\\e615",
        },
        {
          icon: "icon-file",
          content: "\\e61d",
        },
        {
          icon: "icon-address2",
          content: "\\e602",
        },
        {
          icon: "icon-address",
          content: "\\e63e",
        },
        {
          icon: "icon-reduce",
          content: "\\e661",
        },
        {
          icon: "icon-warning2",
          content: "\\eb65",
        },
        {
          icon: "icon-eyes",
          content: "\\e6de",
        },
        {
          icon: "icon-success",
          content: "\\e70d",
        },
        {
          icon: "icon-star",
          content: "\\e646",
        },
        {
          icon: "icon-refresh",
          content: "\\e603",
        },
        {
          icon: "icon-search",
          content: "\\e669",
        },
        {
          icon: "icon-download",
          content: "\\e65c",
        },
        {
          icon: "icon-email",
          content: "\\e678",
        },
        {
          icon: "icon-add2",
          content: "\\e61a",
        },
        {
          icon: "icon-github",
          content: "\\e600",
        },
        {
          icon: "icon-add",
          content: "\\e63d",
        },
        {
          icon: "icon-tel",
          content: "\\e605",
        },
        {
          icon: "icon-setting",
          content: "\\e60b",
        },
        {
          icon: "icon-delete",
          content: "\\e67d",
        },
        {
          icon: "icon-close",
          content: "\\e60f",
        },
        {
          icon: "icon-reduce1",
          content: "\\e6b5",
        },
        {
          icon: "icon-close2",
          content: "\\e628",
        },
      ],
    };
  },
  // props: {
  //   iconList: Array
  // },

  mounted() {},
};
</script>
<style>
.demo-block {
  border: 1px solid #ebedf0;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  border-radius: 2px;
  display: inline-block;
  width: 100%;
  position: relative;
  margin: 0 0 16px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.demo-block p {
  padding: 0;
  margin: 0;
}
.demo-block-source1 ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.demo-block-source1 ul li {
  padding: 20px 0;
  border-right: 1px solid #ebedf0;
  border-bottom: 1px solid #ebedf0;
  width: 20%;
  height: 120px;
  text-align: center;
}
.demo-block-source1 ul li:nth-child(5n) {
  border-right: 0;
}
.demo-block-source1 ul li span {
  display: block;
  padding-top: 5px;
  color: rgba(0, 0, 0, 0.6);
}
.demo-block-source1 ul li i {
  font-size: 30px;
}
/* .slide-toggle-enter-active{ animation: slideDown .3s; transform-origin: center top }
  .slide-toggle-leave-active{ animation: slideUp .3s; transform-origin: center top } */
/* @keyframes slideDown{
    0%{ opacity: 0; transform: scaleY(0); }
    100%{ opacity: 1; transform: scaleY(1); }
  }
  @keyframes slideUp{
    0%{ opacity: 1; transform: scaleY(1); }
    100%{ opacity: 0; transform: scaleY(0); }
  } */
</style>
