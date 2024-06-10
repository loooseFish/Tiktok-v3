<template>
  <router-view></router-view>
  <Transition name="login">
    <AsyncComp v-if="loginShow" />
  </Transition>
  <Vfooter v-show="footerShow" />
  <!-- <loader /> -->
</template>

<script setup>
// 组件注册
import Vfooter from './components/common/footer.vue';
import login from './components/home/login.vue';

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(login)
  })
})

// API使用
import { defineAsyncComponent } from 'vue';

// Pinia注入
import { useDataStore } from './store';
import { computed } from 'vue'
const $store = useDataStore();
const loginShow = computed({
  get: () => $store.loginShow,
  set: (value) => $store.loginShow = value
});
const footerShow = computed({
  get: () => $store.footerShow,
  set: (value) => $store.footerShow = value
});

</script>

<style lang="less" scoped>
.login-enter-to,
.login-leave-from {
  top: 0%;
}

.login-enter-from,
.login-leave-to {
  opacity: 0;
  top: 100%;
}

.login-enter-active,
.login-leave-active {
  transition: all 0.5s;
}
</style>
