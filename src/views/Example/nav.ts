import { navItemType } from '@/base/type/nav.type'

// 展示样式请参见同级目录下的README.md
const nav:navItemType[] = [{
    name: 'JiTable',
    path: '/ji-table',
    ssoCode: 'ji-table',
    component: () => import('./Table/index.vue')
  },{
  name: 'JiButton',
  path: '/ji-button',
  ssoCode: 'ji-button',
  component: () => import('./Button/index.vue')
}]

export default nav