<!-- Created by 337547038 on 2018/8/24 0024. -->
<script>
export default {
  data () {
    return {
      value1: '选项1',
      value6: '',
      value8: '',
      options: [
        "选项1",
        "选项2",
        "选项3",
        "选项4",
        "选项5"
      ]
    }
  },
  components: {},
  methods: {
    _click (value) {
      this.value9 = value
      console.log(value)
      this.$refs.select9.close()
    },
    _change (value) {
      console.log(value)
    },
    _beforeChange(value) {
      console.log(value)
      alert('不能选择')
      return false
    }
  }
}
</script>
# Select 选择器

> 注意：Select是通过div显示隐藏来模拟，下拉层并不是插入至body，因此父元素不能有overflow:hidden

### 1、基础用法
:::demo 
```html
<template>
 <fun-select placeholder="请选择" :options="options" v-model="value1" ></fun-select>
</template>
<script>
export default {
  data () {
    return {
      value1:'选项1'
    }
  }
}
</script>

```
:::

<!-- ### 2、默认初始值
:::demo 
```html
<template>
 <ak-select placeholder="请选择" :options="options" v-model="value2"></ak-select>
</template>
<script>
export default {
  data () {
    return {
      value2:'2'
    }
  }
}
</script>
```
:::

### 3、禁用状态
:::demo 
```html
<template>
 <ak-select placeholder="请选择" :options="options" v-model="value3" :disabled="true"></ak-select>
</template>
<script>
export default {
  data () {
    return {
      value3:''
    }
  }
}
</script>
```
:::

### 4、禁用项
:::demo 在`options`里设置`disabled:true`。禁用选项4
```html
<template>
 <ak-select placeholder="请选择" :options="options" v-model="value4"></ak-select>
</template>
<script>
export default {
  data () {
    return {
      value4:''
    }
  }
}
</script>
```
:::
### 5、设定下拉个数
:::demo 设定下拉个数，超出显示滚动条`showNum="5"`
```html
<template>
 <ak-select placeholder="请选择" :options="options" v-model="value5" :showNum="5"></ak-select>
</template>
<script>
export default {
  data () {
    return {
      value5:''
    }
  }
}
</script>
```
::: -->

### 6、可清空选项
:::demo `clear=true`
```html
<template>
 <fun-select placeholder="请选择" :options="options" v-model="value6" :clear=true></fun-select>
</template>
<script>
export default {
  data () {
    return {
      value6:'选项1'
    }
  }
}
</script>
```
:::



### 8、可多选
:::demo `multiple=true`。多选时value必须是数组 `multipleLimit=4` 最多可选4个
```html
<template>
 <fun-select placeholder="请选择" :options="options" v-model="value8" :multiple=true :multipleLimit ="4"></fun-select>
</template>
<script>
export default {
  data () {
    return {
      value8:[]
    }
  }
}
</script>
```
:::

<!--
### 10、改变事件
:::demo 
```html
<template>
 <ak-select placeholder="请选择" :options="options" v-model="value10" @change="_change">
</ak-select>
</template>
<script>
export default {
  data () {
    return {
      value10: ''
    }
  },
  methods: {
    _change (value) {
      console.log(value)
    }
  }
}
</script>
```
:::

### 11、改变前拉截事件
:::demo 
```html
<template>
 <ak-select placeholder="请选择" :options="options" v-model="value11" :beforeChange="_beforeChange">
</ak-select>
</template>
<script>
export default {
  data () {
    return {
      value11: ''
    }
  },
  methods: {
    _beforeChange(value) {
       console.log(value)
       alert('不能选择')
       return false
    }
  }
}
</script>
```
:::

### 12、使用`Option`组件，参数和`select`的`option`一致
:::demo 
```html
<template>
 <ak-select placeholder="请选择" v-model="value12">
   <ak-option value="1" label="选择一"></ak-option>
</ak-select>
</template>
<script>
export default {
  data () {
    return {
      value12: ''
    }
  },
  methods: {
  }
}
</script>
```
:::

### 示例option数据
```javascript
export default {
  data () {
    return {
      options: [
        {label: '选项1', value: '1'},
        {label: '选项2', value: '2'},
        {label: '选项3', value: '3'},
        {label: '选项4', value: '4', disabled: true},
        {label: '选项5', value: '5'},
        {value: '6'},
        {label: '选项7', value: '7'},
        {label: '选项8', value: '8'},
        {label: '选项9', value: '9'},
        {label: '选项10', value: '10'}
      ]
    }
  }
}
``` -->

## API
### Select
|参数|类型|说明|
|-|-|-|
|multiple          | boolean/false         |是否多选|
|multipleLimit     | boolean/false         |多选时用户最多可以选择的项目数，为 0 则不限制|
|disabled          | boolean/false         |是否禁用|
|value             | string,array          |通过v-model绑定，multiple时为array|
|placeholder       | string                |占位符,value为空时显示。占位符为空时显示options第一项|
|options           | array                 |下拉选项数据|
|clear             | boolean/false         |是否可以清空选项|

### Option Attributes
|参数|类型|说明|
|-|-|-|
|value            | string                |选项的值|
|label            | string                |选项的标签，若不设置则默认与 value 相同|
|disabled         | boolean/false         |是否禁用该选项|
|className        | string                |对当前项添加样式|

### Select Events
|参数|类型|说明|
|-|-|-|
|change            | function              |选中值发生变化时触发|
|beforeChange      | function              |选择前事件|

### Select Method
|参数|类型|说明|
|-|-|-|
|close            |用于收起下拉|


