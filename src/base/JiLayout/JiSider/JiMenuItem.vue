<template>
  <a-menu-item v-if="!Array.isArray(visibleMenuItem.children)">
    <router-link :to="visibleMenuItem.path">{{
      visibleMenuItem.name
    }}</router-link>
  </a-menu-item>
  <a-sub-menu v-else>
    <template #title>
      <router-link :to="visibleMenuItem.path">{{
        visibleMenuItem.name
      }}</router-link>
    </template>
    <ji-menu-item
      v-for="subMenuItem in visibleMenuItem.children"
      :key="subMenuItem.path"
      :menu-item="subMenuItem"
    />
  </a-sub-menu>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "JiSider",
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    menuItem: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const visibleMenuItem = {
      ...props.menuItem,
    };

    const children =
      visibleMenuItem.children &&
      visibleMenuItem.children.filter(
        (item) => !item.meta || item.meta.hidden !== true
      );

    if (children && children.length > 0) {
      visibleMenuItem.children = children;
    } else {
      visibleMenuItem.children = false;
    }

    return { visibleMenuItem };
  },
});
</script>
<style scoped lang="less"></style>
