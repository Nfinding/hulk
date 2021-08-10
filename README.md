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

[JiTable 用法](https://github.com/Nfinding/hulk/tree/feature/table)

## 五、TODO

- [ ] 表格
- [ ] 表单
- [ ] 海报
- [ ] 视频、图片上传、预览、删除、排序
- [ ] 视频播放、视频缓存及播放
- [ ] pdf、word、excle 文件格式的查看、下载
- [ ] 面包屑
- [ ] 更改日志
- [ ] 文档部署
- [ ] 按需引入
- [ ] 单元测试
