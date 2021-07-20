<template>
  <div class="ji-button">
    <a-button
      :class="`ji-button--` + type"
      @click="$emit('click', $event)"
      v-bind="$attrs"
    >
      <slot></slot>
    </a-button>
  </div>
</template>

<script lang="ts">
import { ref, toRef, defineComponent, computed } from "vue";
export default defineComponent({
  name: "JiButton",
  inheritAttrs: false,
  props: {
    type: { type: String, default: "default" },
    text: { type: String, require: true },
  },
  emits: ["click"],
  created() {
    // console.log("$$$", this.$attrs);
  },
  setup: (props, ctx) => {
    return {};
  },
});
</script>

<style>
.ji-button--default {
  background-color: pink;
}
</style>
