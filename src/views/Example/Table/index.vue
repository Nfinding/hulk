<template>
  <ji-table
    searchVisible
    :dataSource="dataSource"
    :columns="columns"
    bordered
    submit="确定"
    cancel="重置"
    @cancel="onCancel"
    @submit="onSubmit"
    @deleteFn="onDeleteFn"
    @viewFn="onViewFn"
  >
    <!-- <template #img="{ record, index }">
      <a-space>
        <a-button>Miss</a-button>
        <a-button>{{ record.name }}</a-button>
        <a-button>{{ index }}</a-button>
      </a-space>
    </template>
    <template #btn="{ record, index }">
      <a-space>
        <a-button>Button</a-button>
        <a-button>{{ record.name }}</a-button>
        <a-button>{{ index }}</a-button>
      </a-space>
    </template> -->
  </ji-table>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup: () => {
    const dataSource = reactive([
      {
        key: "1",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
        review:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        key: "2",
        name: "姜子牙",
        age: 42,
        address:
          "西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号",
        review:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
    ]);

    // search 回调
    const onCancel = (e: any) => {
      console.log("---done---", e);
    };
    const onSubmit = (e: any) => {
      console.log("---done---", e);
      dataSource.splice(0, 1);
    };
    const onDeleteFn = (e: any) => {
      console.log("---btn---", e);
    };
    const onViewFn = (e: any) => {
      console.log("---btn view---", e);
    };
    return {
      onCancel,
      onSubmit,
      onDeleteFn,
      onViewFn,
      dataSource,
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
          fixed: true,
          width: 100,
          search: {
            type: "input",
          },
        },
        {
          title: "年龄",
          dataIndex: "age",
          key: "age",
          defaultSortOrder: "descend",
          sorter: (a: any, b: any) => a.age - b.age,
          search: {
            type: "select",
            options: [
              {
                name: "32",
                value: 32,
              },
              {
                name: "42",
                value: 42,
              },
            ],
          },
        },
        {
          title: "住址",
          dataIndex: "address",
          key: "address",
          ellipsis: true,
          search: {
            type: "time",
            options: {
              type: "range",
              showTime: false,
              format: "",
              valueFormat: "YYYY-MM-DD HH:mm:ss",
            },
          },
        },
        {
          title: "预览",
          dataIndex: "review",
          key: "review",
          type: "image",
          options: {
            height: 50,
            width: 50,
          },
          // slots: { customRender: "btn" },
          // customRender: ({ record }: any) => {
          //   console.log("---ss---", record);
          //   return h("a", { href: "javascript:;" }, record.name);
          // },
        },
        {
          title: "操作",
          dataIndex: "action",
          key: "action",
          type: "button",
          align: "center",
          options: [
            {
              name: "删除",
              emit: "deleteFn",
              danger: "danger",
            },
            {
              name: "查看",
              emit: "viewFn",
              type: "primary",
            },
          ],
          // slots: { customRender: "btn" },
          // customRender: ({ record }: any) => {
          //   console.log("---ss---", record);
          //   return h("a", { href: "javascript:;" }, record.name);
          // },
        },
      ],
    };
  },
});
</script>
