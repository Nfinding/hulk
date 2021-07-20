<template>
  <a-config-provider :locale="zhCN">
    <ji-layout @logout="onLogout" :menus="menus">
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>
      <router-view />
    </ji-layout>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JiLayout from "./base/JiLayout/index.vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
export default defineComponent({
  name: "App",
  components: {
    JiLayout,
  },
  props: {
    menus: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const onLogout = () => {
      console.log(8888);
    };

    return { onLogout, zhCN };
  },
});
</script>

<style>
@import "./styles/reset.less";
</style>
