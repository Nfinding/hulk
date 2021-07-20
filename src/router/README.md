# 路由编写规则

在views文件夹，各业务子文件夹的nav.ts文件中编写

# 最终给到vue路由的数据结构

*仅为一维数组*

原因：

1. 大多数实际情况下，无嵌套路由的场景
2. 方便keep-alive，因为该标签仅支持一层组件缓存，而非嵌套组件

```json
[
  {
    "path": "/",
    "name": "home"
    component: () => import('xxx'),
  },
  {
    "name": "pageA/listA",
    "path": "/pageA/listA"
  },
  {
    "name": "pageA/listA/detailA",
    "meta": {
      "hidden": true,
    },
    "path": "/pageA/listA/detailA"
    component: () => import('xxx'),
  },
  {
    "name": "pageA/listB",
    "path": "/pageA/listB"
    component: () => import('xxx'),
  }
]
```


# 给到菜单和面包屑的数据结构

*实际有层级的结构*

```json
[
  {
    "name": "pageA",
    "path": "pageA",
    "ssoCode": "pageA",
    "children": [
      {
        "name": "listA",
        "children": [
          {
            "name": "detailA",
            "meta": {
              "hidden": true,
            }
          }
        ]
      },
      {
        "name": "listB"
      }
    ]
  }
]
```