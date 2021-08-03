<template>
  <div class="ji-table-search">
    <a-form ref="searchForm" :model="formState" layout="inline">
      <!-- 支持自定义元素 -->
      <slot
        v-for="slot in slotNames"
        :key="slot"
        :name="slot"
        :formState="formState"
      ></slot>

      <a-form-item
        class="serach-item"
        v-for="(item, index) in formOptions.filter(
          (item) => !!item.search.type
        )"
        :key="index"
        :label="item.title"
      >
        <a-input
          v-if="item.search.type === 'input'"
          v-model:value="formState[item.key]"
          :placeholder="`请输入${item.title}`"
          v-bind="item.search.attrs"
        />
        <a-select
          v-else-if="item.search.type === 'select'"
          v-model:value="formState[item.key]"
          :placeholder="`请选择${item.title}`"
          v-bind="item.search.attrs"
        >
          <a-select-option
            v-for="(opt, i) in item.search.options"
            :key="i"
            :value="opt.value"
            >{{ opt.name }}</a-select-option
          >
        </a-select>
        <component
          v-else-if="item.search.type === 'time'"
          :is="`a-${item.search.attrs.type}-Picker`"
          v-model:value="formState[item.key]"
          valueFormat="YYYY-MM-DD HH:mm:ss"
          format="YYYY-MM-DD HH:mm:ss"
          v-bind="item.search.attrs"
        ></component>
      </a-form-item>
      <!-- <a-form-item class="serach-item" label="Activity time"> </a-form-item> -->
      <a-form-item class="serach-item">
        <a-space>
          <a-button type="primary" @click="onSubmit">{{ submit }}</a-button>
          <a-button @click="onCancel">{{ cancel }}</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { ColumnType } from "./index";
import { ref, toRaw, defineComponent, computed, toRef, onUpdated } from "vue";
import { Form } from "ant-design-vue";
const useForm = Form.useForm;

export default defineComponent({
  name: "JiSearch",
  inheritAttrs: false,
  components: {},
  props: {
    submit: { type: String, default: "确定" },
    cancel: { type: String, default: "重置" },
    formOptions: { type: Array, required: true },
  },
  emits: ["submit", "cancel"],
  setup(props, { emit, slots }) {
    // 表单插槽统计；
    const slotNames = ref<string[]>([]);
    onUpdated(() => {
      for (const key in slots) {
        slotNames.value.push(key);
      }
    });

    const formData: { [key: string]: any } = ref({});
    const rulesRef = ref({});
    const formOptions = toRef(props, "formOptions");
    // 传入from数据实现动态监听 对form表单字段初始化
    let resetFields = computed(() => {
      formOptions.value.forEach((item: any) => {
        if (item.search.type === "input") formData.value[item.key] = "";
        if (
          item.search.type === "select" ||
          item.search.type === "time" ||
          item.search.slot
        ) {
          formData.value[item.key] = undefined;
        }
      });
      return useForm(formData, rulesRef).resetFields;
    });

    // 回调事件
    const onSubmit = () => {
      console.log("---FFFF---", formData.value);
      emit("submit", toRaw(formData.value));
    };
    const onCancel = () => {
      resetFields.value();
      emit("cancel", toRaw(formData.value));
    };

    return {
      formState: formData,
      slotNames,
      onSubmit,
      onCancel,
    };
  },
});
</script>

<style lang="less" scoped>
.ji-table-search {
  .serach-item {
    margin-bottom: 10px;
  }
}
</style>
