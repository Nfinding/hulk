# B 端业务组件库

## 一、介绍

> B 端项目基础功能封装，包含基础布局、菜单导航和权限等。

## 二、技术栈

> 基于 Vue3 + TypeScript + Vite + Ant-design-vue

### 安装依赖

```
yarn install
or
npm install
```

## 三、组件库打包

```
yarn build
or
npm run build
```

## 四、组件库使用

1. 确保项目安装了 `vue@^3.0.0` `ant-design-vue@^2.2.0`
2. 直接 npm 安装使用包

## 体验 demo

安装 npm 包

```
yarn add https://gitlab.jiliguala.com/h5/basic-admin/admin-project-base.git#feature/table
or
npm install https://gitlab.jiliguala.com/h5/basic-admin/admin-project-base.git#feature/table
```

组件里使用

```
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import { JiTable } from 'slbasic'
import 'slbasic/dist/style.css'

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

### JiTable 用法

默认支持表单，其中默认支持 name 为 search 的 slot;

```
type search = {
  type: 'input' | 'select' : 'time'
  options?: {name:string;value:string}[] | {time:'range'|'time'|'date';showTime?:boolean;format?:string;valueFormat?:string}
}
searchVisible 为 true 时，需在 columns 对应表格字段中添加 search 字段；并且注入cancel 和 submit方法（方法返回form表单数据）
form表单暂时支持类型 input
select（options: {name: string; value: string}[]）
time(options: { time:'range'|'time'|'date'; showTime?:Object | Boolean; format?:string; valueFormat?:string })
```

```
  columns: [
    {
      ...
      // 添加search字段
      search: {
        type: "input",
      },
    }
    {
      ...
      search: {
        type: "select",
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
        options: {
          type: "time",
          showTime: false,//非time情况下默认不展示时间选择
          format: "YYYY-MM-DD HH:mm:ss",//默认值
          valueFormat: "YYYY-MM-DD HH:mm:ss",//默认值
        },
      },
    }
  ]
```

默认支持表格内容组件，其中暂提供 type 为 'button' | 'image'

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

## 五、TODO

- [ ] 表格默认支持操作栏
- [ ] 文档示例
- [ ] 更改日志
- [ ] 文档部署
- [ ] 按需引入
- [ ] 单元测试
