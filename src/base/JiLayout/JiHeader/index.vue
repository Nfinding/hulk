<template>
  <section class="container">
    <div class="title">
      <img
        class="logo"
        src="https://qiniucdn.jiliguala.com/dev/promo/76e7e07ac41245f6a5aac28e2a856091.png"
        alt="logo"
      />
      <h1 class="title-text">{{ sysName }}</h1>
    </div>
    <div class="mid">
      <slot></slot>
    </div>
    <div class="user-info">
      {{ userName }}
      <a-button size="small" @click="onLogout"> 退出登录 </a-button>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "JiHeader",
  emits: ["logout"],
  props: {
    sysName: {
      type: String,
      default: "B端业务组件库",
    },
    userName: {
      type: String,
      default: "guagua@lijiguala.com",
    },
  },
  setup(props, context) {
    const onLogout = () => {
      context.emit("logout");
    };

    return { onLogout };
  },
});
</script>
<style scoped lang="less">
.container {
  display: flex;
  justify-content: space-between;

  .title {
    display: flex;
    align-items: center;
    padding: 0 10px;
    width: 200px;

    .logo {
      width: 45px;
      padding: 5px;
    }

    .title-text {
      font-weight: 700;
      font-size: 20px;
      margin: 0;
      color: #fff;
    }
  }

  .mid {
    flex: 1;
  }

  .user-info {
    margin: 0 10px;
    color: #fff;
    font-size: 14px;
    button {
      margin: 0 5px;
      color: #5dbd81;
      background: transparent;
      border-color: #5dbd81;
    }
  }
}
</style>
