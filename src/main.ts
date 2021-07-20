import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Antd from "ant-design-vue"
import 'ant-design-vue/dist/antd.less'

import {routes, menus} from './router'
import App from './App.vue'
// import JiTable from './components/Table'
import JiUI,{ JiTable, JiButton } from './components/index'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// console.log('routes', routes)
// console.log('menus', menus)

const app = createApp(App, {
  menus
})

app.use(router)
  .use(Antd)
  .use(JiTable)
  .use(JiButton)
app.mount('#app')

