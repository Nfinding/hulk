# JiTable 表格业务组件

## 一、介绍

> 基于 Ant-design-vue Table 进行 B 端项目业务表格功能封装，支持 CURD（创建、更新、展示、删除）

## 二、组件使用

组件里使用

```
...
<ji-table
  :searchVisible="true"
  :dataSource="dataSource"
  :columns="columns"
  bordered
  submit="确定"
  cancel="重置"
  @cancel="onCancel"
  @submit="onSubmit"
  @deleteFn="onDeleteFn"
>
// 支持自定义组件
// 列属性添加 slots: { customRender: "custom" }
 <template #custom="{ text, record, index }">
    <a-space>
      <a-button>{text}</a-button>
      <a-button>{{ record.name }}</a-button>
      <a-button>{{ index }}</a-button>
    </a-space>
  </template>
</ji-table>
...

```

### 默认支持表单搜索（位于表格顶部，搜索）其中默认支持 name 为 search 的 slot;

```
type search = {
  type: 'input' | 'select' : 'time'
  attrs: {
    time:'range'|'time'|'date'
    showTime?:boolean
    format?:string
    valueFormat?:string
    ...
  }
  options?: {name:string;value:string}[]
}
+ searchVisible 为 true 时(默认为false)
+ 需在 columns 对应表格字段中添加 search 字段；并且**注入cancel 和 submit方法**（方法返回form表单数据);

+ form 支持类型:
  + input
  + select（options: {name: string; value: string}[]）
  + time(options: { time:'range'|'time'|'date'; showTime?:Object | Boolean; format?:string; valueFormat?:string })
  + 自定义表单组件（下边讲述使用方式）
```

```
  columns: [
    {
      ...
      // 添加search字段
      search: {
        type: "input",
        attrs: {}//antd-design-vue input 属性值
      },
    }
    {
      ...
      search: {
        type: "select",
        attrs: {},//antd-design-vue select 属性值
        options: [
          {
            name: '',
            value: '',
          }
          ...
        ],
      },
    },
    {
      ...
      search: {
        type: "time",
        attrs: {
          //antd-design-vue select 属性值
          type: "time",
          showTime: false,//非time情况下默认不展示时间选择
          format: "YYYY-MM-DD HH:mm:ss",//默认值
          valueFormat: "YYYY-MM-DD HH:mm:ss",//默认值
          ...
        },
      },
    }
  ]
```

#### 支持自定义表单元素插槽

```
type search = {
  slot: string
}
__自定义表格元素时需在 search 字段：slot字段： 对应添加在<ji-table> 中的自定义元素插槽name__
__且插槽*提供fromState字段*对应form表单对象,将自定义表单属性可关联到form表单对象中;__
```

```
  <ji-table
    searchVisible
    :dataSource="dataSource"
    :columns="columns"
    bordered
    submit="确定"
    cancel="重置"
    @cancel="onCancel"
    @submit="onSubmit"
  >
    <template #sex="{ formState }">
      <a-form-item label="性别">
        <a-select v-model:value="formState.sex" placeholder="请选择性别">
          <a-select-option
            v-for="(opt, i) in sexOptions"
            :key="i"
            :value="opt.value"
            >{{ opt.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
    </template>
  </ji-table>


  columns: [
    {
      ...
      // 添加search字段
      search: {
        slot: "sex",
      },
    }
    ...
  ]
```

### 默认支持表格 内容组件，其中暂提供 type 为 'button' | 'image'

```
使用方式：
columns: [
    {
      ...
      // 添加type字段,标示此列内容为button元素，
      type: 'button',
      options: [
        {
          name: '删除', //button名
          emit: 'deleteFn' //button 点击报漏事件（在Ji-table 标签中添加emit事件接收）
          ...//a-button 属性等
        }
      ]
    }
    {
      ...
      type: 'image',
      options: {
        ...// a-image 属性等
      }
    },
  ]
```

## 三、TODO

- [*] 表格自定义组件支持
- [*] 图片类型能力扩充
- [*] 按钮类型
- [ ] 按钮类型
- [ ] 表单项支持自定义表单字段
- [ ] 动态下拉选项