<template>
  <div class="ji-table-search">
    <a-form ref="searchForm" :model="formState" layout="inline">
      <a-form-item
        v-for="(item, index) in formOptions"
        :key="index"
        :label="item.title"
      >
        <a-input
          v-if="item.search.type === 'input'"
          v-model:value="formState[item.key]"
          :placeholder="`请输入${item.title}`"
        />
        <a-select
          v-else-if="item.search.type === 'select'"
          v-model:value="formState[item.key]"
          :placeholder="`请选择${item.title}`"
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
          :is="`a-${item.search.options.type}-Picker`"
          v-model:value="formState[item.key]"
          valueFormat="YYYY-MM-DD HH:mm:ss"
          format="YYYY-MM-DD HH:mm:ss"
          v-bind="item.search.options"
        ></component>
      </a-form-item>
      <a-form-item label="Activity time"> </a-form-item>
      <a-form-item>
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
import { ref, toRaw, defineComponent, watch, computed, toRef } from "vue";
import { Form } from "ant-design-vue";
const useForm = Form.useForm;
interface FormState {
  name: string;
  region: string | undefined;
  date1: any;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}
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
  created() {
    // console.log("$$$", this.$attrs);
  },
  setup(props, context) {
    const { emit } = context;
    const formData: { [key: string]: any } = ref({});
    const rulesRef = ref({});
    const formOptions = toRef(props, "formOptions");
    // 传入from数据实现动态监听 对form表单字段初始化
    let resetFields = computed(() => {
      formOptions.value.forEach((item: any) => {
        if (item.search.type === "input") formData.value[item.key] = "";
        if (item.search.type === "select" || item.search.type === "time")
          formData.value[item.key] = undefined;
      });
      return useForm(formData, rulesRef).resetFields;
    });

    // 回调事件
    const onSubmit = () => {
      emit("submit", toRaw(formData.value));
    };
    const onCancel = () => {
      resetFields.value();
      emit("cancel", toRaw(formData.value));
    };
    return {
      formState: formData,
      onSubmit,
      onCancel,
    };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
