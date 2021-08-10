<template>
  <div class="ji-table-mask">
    <slot name="search">
      <search-from
        v-if="searchVisible"
        :formOptions="formOptions"
        :submit="submit"
        :cancel="cancel"
        @cancel="$emit('cancel', $event)"
        @submit="$emit('submit', $event)"
      >
        <!-- 支持表单自定义元素 -->
        <template
          v-for="slot in formSlotNames"
          :key="slot"
          v-slot:[slot]="{ formState }"
        >
          <slot :name="slot" :formState="formState"></slot>
        </template>
      </search-from>
    </slot>
    <!--TODO 自定义操作区 -->
    <!-- <slot name="handle">
      <a-row justify="end">
        <a-space align="end">
          <a-button>编辑</a-button>
        </a-space>
      </a-row>
    </slot> -->
    <a-table :columns="formatColumns" v-bind="$attrs">
      <!-- 支持自定义元素 -->
      <template
        v-for="slot in slotNames"
        :key="slot"
        v-slot:[slot]="{ text, record, index }"
      >
        <slot :name="slot" :text="text" :record="record" :index="index"></slot>
      </template>
      <!-- 默认报漏button ｜ image类型 -->
      <template #btn="{ record, index }">
        <a-space>
          <a-button
            v-for="(btn, i) in btnOptions"
            :key="i"
            v-bind="btn"
            @click="
              (e) => {
                this.$emit(btn.emit, { e, record, index });
              }
            "
            >{{ btn.name }}</a-button
          >
        </a-space>
      </template>
      <template #img="{ text }">
        <a-space>
          <a-image
            v-bind="imgOptions"
            :src="text"
            fallback="data:image/png;base64,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"
          />
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { ColumnType } from "./index";
import SearchFrom from "./SearchFrom.vue";
import { ref, toRef, defineComponent, computed, toRaw } from "vue";

// 自定义组件默认支持类型
const customComponentMap = new Map([
  ["button", "btn"],
  ["image", "img"],
]);

export default defineComponent({
  name: "JiTable",
  inheritAttrs: false,
  components: {
    SearchFrom,
  },
  props: {
    submit: String,
    cancel: String,
    searchVisible: Boolean,
    columns: { type: Array, required: true },
  },
  emits: ["submit", "cancel"],
  created() {
    // console.log("$$$", this.$attrs);
  },
  setup: (props, { slots }) => {
    const columns = toRef(props, "columns");

    // JiTable插槽统计 为插入a-table对应插槽内；
    const slotNames = ref<string[]>([]);
    const formSlotNames = ref<string[]>([]);

    // 过滤配置自定义表格元素内容
    const btnOptions = ref([]);
    const imgOptions = ref({});
    const formatColumns = computed(() => {
      return columns.value.map((item: any) => {
        if (item.type) {
          if (!item.slots) {
            switch (item.type) {
              case "button":
                btnOptions.value = item.options;
                break;
              case "image":
                imgOptions.value = item.options;
                break;
            }
            item.slots = { customRender: customComponentMap.get(item.type) };
          }
        }

        // JiTable插槽统计 为插入a-table对应插槽内；｜ search-from对应插槽内
        for (const key in slots) {
          if (item.search && item.search.slot) {
            formSlotNames.value.push(item.search.slot);
            // 移除slots中from表单的slots 否则将添加进table slot中
            if (item.search.slot !== key) {
              slotNames.value.push(key);
            }
          }
        }
        return item;
      });
    });

    // 过滤生成form单数据
    let formOptions = ref({});
    if (props.searchVisible) {
      formOptions = computed(() => {
        return columns.value.filter((item: any) => !!item.search);
      });
    }

    return {
      slotNames,
      formSlotNames,
      formOptions,
      formatColumns,
      btnOptions,
      imgOptions,
    };
  },
});
</script>

<style scoped></style>
