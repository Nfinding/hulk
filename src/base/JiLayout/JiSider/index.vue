<template>
  <section class="container">
    <!-- <a-menu theme="light" mode="inline" :selected-keys="activeRoute" :open-keys="['pageA','/pageA/listA']"> -->
    <a-menu theme="light" mode="inline" :selected-keys="activeRoute">
      <ji-menu-item v-for="menuItem in menus" :key="menuItem.path" :menu-item="menuItem" />
    </a-menu>
  </section>
</template>
<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

import JiMenuItem from './JiMenuItem.vue'

export default defineComponent({
  name: 'JiSider',
  components: {
    JiMenuItem
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context){
    // TODO刷新页面时，指定的菜单项高亮，且展开
    // 现状：当前无法展开。
    // 方案：按路径push到open-keys中
    // console.log(props.menus)

    const route = useRoute()
    const activeRoute = ref(['/'])

    watch(() => route.path, () => {
      // 当前路由在菜单栏隐藏时，高亮的是parent的菜单项
      if(route.meta && route.meta.hidden) {
        activeRoute.value = [String(route.meta.parent)]
      } else {
        activeRoute.value = [route.path]
      }
    })

    return { activeRoute }
  }
})
</script>
<style scoped lang="less">
</style>