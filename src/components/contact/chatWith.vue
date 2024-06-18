<template>
    <div ref="contact" class="contact">

        <div class="header">
            <goback />
            <span>{{ toName }}</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>

        <br>

        <div ref="freshing"></div>

        <div ref="content" class="content">

            <!-- 历史消息 -->
            <div ref="mobile_page" class="mobile-page">
                <div :class="item.fromId == fromId ? 'user-group' : 'admin-group'" v-for="item, index in letters">
                    <img v-show="item.fromId == toId" class="admin-img" :src="`http://43.138.15.137:3000${toAvatar}`" />
                    <div :class="item.fromId == fromId ? 'user-msg' : 'admin-msg'">
                        <i v-show="item.fromId == toId" class="triangle-admin"></i>
                        <pre
                            :class="item.fromId == fromId ? 'user-reply' : 'admin-reply'">{{ item.privateLetterContent.trim() == '' ? ' ' : item.privateLetterContent }}</pre>
                        <i v-show="item.fromId == fromId" class="triangle-user"></i>
                    </div>
                    <img v-show="item.fromId == fromId" class="user-img"
                        :src="'http://43.138.15.137:3000/assets/avatar/0c34a42d-f0e1-4f13-ad18-c6cdf7ccc060.png'" />
                </div>

            </div>

            <!-- 输入消息 -->
            <div class="msg-input-bgk">
                <div class="msg-input-outer">
                    <input placeholder="发送消息......" id="msg-content" v-model="letterText"></input>
                    <i class="button button-fill" id="send-msg" @click="sendLetter">发送</i>
                </div>
            </div>

            <div ref="uploading"></div>

        </div>

    </div>
</template>

<script setup>
// API
import { onBeforeMount, onMounted, ref, reactive, nextTick, onUpdated } from 'vue';
// 组件
import goback from '../common/goback.vue';
// router 
import { useRoute } from 'vue-router';
const route = useRoute();
// hooks
import { move } from '../../hooks/use-scroll';
import { uploadOrder } from '../../hooks/use-sort';
// axios
import { postLetter, getLetter, readLetter, selfInfo } from '../../service/course';

// 初始数据 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
let toId = ref(null);
let toName = ref(null);
let toAvatar = ref(null);
let fromId = ref(JSON.parse(localStorage.getItem('data')).data.userId);

let selfData = ref({});
let letters = ref([]);

onBeforeMount(async () => {
    toId.value = route.query.toId;
    toAvatar.value = route.query.toAvatar;
    toName.value = route.query.toName;
    await getLetter(toId.value).then(res => {
        if (res.data.code == 200) {
            socket({
                connection: 'http://43.138.15.137:3000',
            }).emit('login', JSON.parse(localStorage.getItem('data')).data.userId);
            letters.value = uploadOrder(res.data.data)
        };

    });

    await selfInfo().then(res => {
        selfData.value = res.data.data;
    });

})

// 实现单对单聊天 ///////////////////////////////////////////////////////////////////////////////////////////////////////////
import { getCurrentInstance } from "vue"
const socket = getCurrentInstance().appContext.config.globalProperties.$socket;

let letterText = ref(null);

const sendLetter = async () => {
    let nowTime = +new Date();
    let obj = {
        fromId: fromId.value,
        toId: toId.value,
        privateLetterContent: letterText.value,
        userAvatar: selfData.value.userAvatar,
        userNickname: selfData.value.userNickname,
        createdAt: nowTime,
    };

    socket({
        connection: 'http://43.138.15.137:3000',
    }).emit("sendPrivateLetter", obj);

    let res = await postLetter(toId.value, { content: letterText.value, fromUserId: fromId.value, toUserId: toId.value });

    letters.value.push(res.data.data);

    letterText.value = '';

    socket({
        connection: 'http://43.138.15.137:3000',
    }).on("receivePrivateLetter", (res) => {
        // receivePrivateLetter客户端和服务端协商好的事件
        console.log(res);
    });

};

// 定位聊天区域////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 获取dom元素
let mobile_page = ref(null);
let content = ref(null);
let contact = ref(null);
let freshing = ref(null);
let uploading = ref(null);
let toUnder = () => {
    // 滚动条顶部的距离 = 滚动条的高度
    content.value.scrollTop = content.value.scrollHeight

    console.log(content.value);
}
onMounted(() => {
    move(content.value, freshing.value, uploading.value);
})

onUpdated(() => {
    toUnder()
})


</script>

<style lang="less" scoped>
// ----------------------------------------------

:root {
    --textSize: (16 / @rootsize);
}

@rootsize: 3.75vw;

.displayFlex(@position, @row) {
    display: flex;
    justify-content: space-evenly;
    align-items: @position;
    flex-direction: @row;
}

.after() {
    content: '';
    display: inline - block;
    position: absolute;
}

// ----------------------------------------------
.contact {
    position: relative;
    animation: toleft 0.25s linear;
    height: 100vh;

    .header {
        position: sticky;
        top: 0;

        z-index: 10;
        height: (50 / @rootsize);
        border-bottom: (1 / @rootsize) solid #eeeeee20;
        .displayFlex(center, row);
        justify-content: space-between;
        background-color: #161622;
    }

    /* ---历史消息--- */
    #service-list .mobile-page pre {
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .content {
        height: 82vh;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .mobile-page .admin-img,
    .mobile-page .user-img {
        border-radius: 50%;
        overflow: hidden;
        width: (45 / @rootsize);
        height: (45 / @rootsize);
        object-fit: fill;

        box-shadow: 0 0 (3 / @rootsize) #7c7c7c;
    }

    i.triangle-admin,
    i.triangle-user {
        width: 0;
        height: 0;
        position: absolute;
        top: (10 / @rootsize);
        display: inline-block;
        border-top: (10 / @rootsize) solid transparent;
        border-bottom: (10 / @rootsize) solid transparent;
    }

    .mobile-page i.triangle-admin {
        left: (7 / @rootsize);
        border-right: (10 / @rootsize) solid #383838;
    }

    .mobile-page i.triangle-user {
        right: (7 / @rootsize);
        border-left: (10 / @rootsize) solid #626DEB;
    }

    .mobile-page .admin-group,
    .mobile-page .user-group {
        padding: (6 / @rootsize);
        display: flex;
        display: -webkit-flex;
    }

    .mobile-page .admin-group {
        justify-content: flex-start;
        -webkit-justify-content: flex-start;
    }

    .mobile-page .user-group {
        justify-content: flex-end;
        -webkit-justify-content: flex-end;
    }

    .mobile-page .admin-reply,
    .mobile-page .user-reply {
        display: inline-block;
        padding: (13 / @rootsize);
        border-radius: (4 / @rootsize);
        background-color: #383838;
        margin: 0 (15 / @rootsize) (12 / @rootsize);
        font-size: (13 / @rootsize);
        font-family: sans-serif;
        white-space: pre-wrap;
    }

    .mobile-page .admin-reply {
        box-shadow: (0 / @rootsize)(0 / @rootsize)(5 / @rootsize) #383838;
    }

    .mobile-page .user-reply {
        color: #E6E9F1;
        text-align: left;
        background-color: #626DEB;
        box-shadow: (0 / @rootsize)(0 / @rootsize)(3 / @rootsize) #626DEB;
    }

    .mobile-page .user-msg,
    .mobile-page .admin-msg {
        width: 75%;
        position: relative;
    }

    .mobile-page .user-msg {
        text-align: right;
    }

    /*--- 消息输入框--- */
    .msg-input-bgk {
        width: 100%;
        height: (50 / @rootsize);
        border-top: 1px solid #ffffff10;
        background-color: #161622;

        position: fixed;
        bottom: 0;

        .displayFlex(center, row);
        justify-content: space-between;
    }

    .msg-input-outer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .msg-input-outer {
        border-radius: (5 / @rootsize);
        flex-grow: 2;
        margin-right: 1rem;
        border: (0 / @rootsize);

        input {
            width: 80%;
            outline: none;
            color: #ffffff80;
            border: 1px solid #00000000;
            background-color: transparent;
            font-size: (15 / @rootsize);
            text-indent: (25 / @rootsize);

            &::placeholder {
                text-indent: (25 / @rootsize);
                color: #ffffff80;
            }
        }
    }

    .msg-input-outer>i.button {
        display: inline-block;
        font-style: normal;
        margin: 0;
        color: #b6b6b6;
        font-size: (13 / @rootsize);
        width: (45 / @rootsize);
        height: (28 / @rootsize);
        text-align: center;
        line-height: (28 / @rootsize);
        border-radius: (5 / @rootsize);
        border: 1px solid #b6b6b6;
    }

}

@keyframes toleft {
    0% {
        left: 100%;
    }

    100% {
        left: 0;
    }
}
</style>
