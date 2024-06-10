<template>
  <div>1</div>
</template>


<script setup>
import {
  defineAsyncComponent,
  nextTick,
  onMounted,
  onUpdated,
  ref,
  watchEffect,
} from "vue";
import { getUserInfo } from "../hooks/getUserInfo";
import { useRoute } from "vue-router";
import { getPrivateLetterAPI, postPrivateLetterAPI } from "../api/message";

import { inject } from "vue";
const socket = inject("socket"); // 注入到全局

const headerTop = defineAsyncComponent(() =>
  import("../components/common/header-top.vue")
);
const inputBar = defineAsyncComponent(() =>
  import("../components/common/inputBar.vue")
);

let userInfo = JSON.parse(localStorage.getItem("userInfo"));
let myInfo = ref([]);
const getUser = async () => {
  let res = await getUserInfo();

  if (res.code === 200) {
    socket.emit("login", res.data.userId);
    myInfo.value = res.data;
  }
};

getUser();

let route = useRoute();
let friendInfo = JSON.parse(route.query.friendInfo);
let data = ref([]);
const getPrivateLetter = async () => {
  let res = await getPrivateLetterAPI({
    userId: userInfo.userId,
    friendId: friendInfo.userId,
  });
  if (res.code !== 200) return;
  data.value = res.data;
};
getPrivateLetter();

const sendFn = (val) => {
  let nowTime = +new Date();
  let obj = {
    fromId: userInfo.userId,
    toId: friendInfo.userId,
    privateLetterContent: val,
    userAvatar: myInfo.userAvatar,
    userNickname: myInfo.userNickname,
    createdAt: nowTime,
  };
  socket.emit("sendPrivateLetter", obj);

  const postContent = async () => {
    let res = await postPrivateLetterAPI({
      fromUserId: userInfo.userId,
      toUserId: friendInfo.userId,
      content: val,
    });
    if (res.code === 200) data.value.push(res.data);
  };
  postContent();
};
socket.on("receivePrivateLetter", (res) => {
  // receivePrivateLetter客户端和服务端协商好的事件
  data.value.push(res);
});

let content = ref(null);
let pox = ref(null);
const toBottom = () => {
  if (content.value) {
    content.value.scrollTop =
      content.value.scrollHeight - content.value.clientHeight;
  }
};
onUpdated(() => {
  toBottom();
});
</script>