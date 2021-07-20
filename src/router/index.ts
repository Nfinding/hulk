import { RouteRecordRaw } from 'vue-router'

import { formateBizRoutes } from '@/base/util/formateRoute'
import exampleRoutes from  '@/views/Example/nav'
import Page404 from  '@/base/404/index.vue'

const sysRoutes: RouteRecordRaw[] = [{
  path: '/404',
  component: Page404
}, {
  path: '/:pathMatch(.*)*',
  redirect: '/404'
}]

const {
  formatedMenus: menus,
  formatedBizRoutes
} = formateBizRoutes(<RouteRecordRaw[]>exampleRoutes)
const routes = [...formatedBizRoutes, ...sysRoutes]

export {menus}
export {routes}