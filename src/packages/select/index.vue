<template>
  <div :class="`${this.prefixCls}-select`">
    <div class="select-control" @click.stop="_controlClick" :class="{open: show}">
      <div
        :class="{
          'input-control': true,
          placeholder: placeholder && value.length === 0,
        }"
      >
        {{ text }}
      </div>
      <div
        class="icon-close icon"
        v-if="clear && value.length > 0"
        @click.stop="_closeClick"
      ></div>
      <div class="icon-arrow icon" :class="{ open: show }"></div>
    </div>
    <transition name="slide-toggle">
      <div class="select-down" v-show="show">
        <ul>
          <li
            v-for="(item, index) in options"
            :key="index"
            @click="_itemClick(item)"
            :class="{ active: getActive(item, index) }"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { prefixCls } from "../prefixCls";
export default {
  name: `${prefixCls}-select`,
  data() {
    return {
      prefixCls: prefixCls,
      //下拉显示
      show: false,
      text: "",
    };
  },
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    multipleLimit: {
      type: Number,
      default: 0,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    //选中的值,multiple时为数组
    value: [String, Array,Number],
    placeholder: String,
    //下拉选项数据
    options: Array,
    //是否开启清除按钮
    clear: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value() {
      this.setText();
      console.log(1);
      console.log(this.value);
    },
  },
  methods: {
    //清除选项
    _closeClick() {
      this.text = "";
      this.$emit("input", this.multiple ? [] : "");
      this.show = false;
    },
    _controlClick() {
      this.show = !this.show;
    },
    _itemClick(item) {
      //多选
      if (this.multiple) {
        let list =
          this.text && this.text !== this.placeholder
            ? this.text.split(",")
            : [];

        let index = list.indexOf(item);
        //限制多选数量
        if (this.multipleLimit > 0 && list.length >= this.multipleLimit) {
          if (index !== -1) {
            list.splice(index, 1);
            this.text = list.join(",");
            this.$emit("input", list);
          }
          return;
        }
        //如果已经选择 则取消选择该选项
        if (index === -1) {
          list.push(item);
        } else {
          list.splice(index, 1);
          if(list.length === 0) {
            this.show =false
          }
        }
        console.log(list);

        this.text = list.join(",");
        this.$emit("input", list);
        // this.$nextTick(() => {
        //   console.log(this.value);
        // });
      } else {
        //单选
        if (this.text === item) {
          this.text = "";
        } else {
          this.text = item;
        }
        this.$emit("input", item);
      }
    },
    //选中的选项增加class
    getActive(item, index) {
      if (this.multiple) {
        return this.text.split(",").indexOf(item) !== -1;
      } else {
        return item === this.text || index + 1 === Number(this.text);
      }
    },
    //根据value设置选中值,value可以是数字,字符数字,选项值,选项值数组
    setText() {
      //当v-model传入value值时,显示对应的值,没有时显示placeholder或第一项
      if (this.value.length>0 || this.value) {
        if (
          this.options.indexOf(this.value) !== -1
        ) {
          console.log(1);
          this.text = this.value;
          return;
        }
        //当为多选value为数组时
        else {
          if (!this.multiple) return;
          let textList = [];
          for (const i in this.options) {
            const option = this.options[i];
            if (this.value.indexOf(option) !== -1) {
              textList.push(option);
            }
            this.text = textList.join(",");
          }
        }
      } else {
        if (this.placeholder) {
          this.text = this.placeholder;
        } else {
          this.text = this.options[0];
        }
      }
    },
  },
  mounted() {
    console.log(this.$el.children);
    document.addEventListener("click", (e) => {
      console.log(111);
      if (this.$el.contains(e.target) && this.multiple) {
        return;
      } else {
        this.show = false;
      }
    });
    this.setText();
  },
  computed: {},
};
</script>

<style>
</style>