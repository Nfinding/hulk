<template>
  <a-layout class="app-container">
    <a-layout-header class="app-header">
      <ji-header @logout="onLogout">
        <slot name="header"></slot>
      </ji-header>
    </a-layout-header>
    <a-layout>
      <a-layout-sider collapsible theme="light" :collapsed="isCollapsed" @collapse="onCollapse">
        <ji-sider :collapsed="isCollapsed" :menus="menus"></ji-sider>
      </a-layout-sider>
      <a-layout-content>
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

import JiHeader from './JiHeader/index.vue'
import JiSider from './JiSider/index.vue'

export default defineComponent({
  name: 'JiLayout',
  components: {
    JiHeader,
    JiSider
  },
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context){
    const historyCollapsed = localStorage.getItem('isCollapsed') === 'true'
    const isCollapsed = ref(historyCollapsed)
    const onLogout = () => {
      context.emit('logout')
    }

    const onCollapse = (collapsed: boolean, type: string) => {
      isCollapsed.value = !isCollapsed.value
      localStorage.setItem('isCollapsed', String(collapsed))
    };
    
    return { onLogout, isCollapsed, onCollapse }
  }
//   props: {
//     msg: {
//       type: String,
//       required: true
//     }
//   },
//   created(){
//     console.log(this.$attrs)
//   },
//   setup: () => {
//     const count = ref(0)
//     const router = useRouter()
//     const goExample = ()=>{
//       // router.push('/example')
//        window.location.href = `https://dev-sso.jiliguala.com/login?redirect=${encodeURIComponent(
//         window.location.href,
//       )}`
//     }
//     return { count, goExample}
//   }
})
</script>
<style scoped lang="less">
.app-container {
  width: 100vw;
  height: 100vh;
}
.app-header {
  padding: 0;
}
.app-sider {
  background: #fff;
}
</style>
