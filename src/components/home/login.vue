<template>
    <div class="login">
        <div class="header">
            <span @click="loginShow = false">
                <svg t="1716810993760" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2778" width="17" height="17">
                    <path
                        d="M512 451.33l242.679-242.679c16.754-16.753 43.916-16.753 60.67 0 16.753 16.754 16.753 43.916 0 60.67L572.669 512l242.68 242.679c16.753 16.754 16.753 43.916 0 60.67-16.754 16.753-43.916 16.753-60.67 0L512 572.669 269.321 815.35c-16.754 16.753-43.916 16.753-60.67 0-16.753-16.754-16.753-43.916 0-60.67L451.331 512 208.65 269.321c-16.753-16.754-16.753-43.916 0-60.67 16.754-16.753 43.916-16.753 60.67 0L512 451.331z"
                        fill="#dbdbdb" p-id="2779"></path>
                </svg>
            </span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span @click="show = !show">注册账号</span>
        </div>
        <div class="main">
            <div class="top">
                <span>登录后即可展示自己</span>
            </div>
            <div class="inputs">
                <input type="text" v-model="email" placeholder="输入邮箱">
                <input type="password" v-model="password" placeholder="输入密码">
            </div>
            <div class="forget">
                <span>忘记了? 找回密码</span>
            </div>
            <div class="comfirm">
                <button @click="comfirm_Login">登录</button>
            </div>
        </div>

        <!-- 注册 -->
        <Transition name="register">
            <register @send="send" v-if="show" />
        </Transition>
    </div>
</template>

<script setup>
// 组件
import register from './register.vue';
// axios
import { login } from '../../service/course';
// API
import { ref, reactive, toRefs } from 'vue';
// Pinia注入
import { useDataStore } from '../../store';
import { computed } from 'vue'
const $store = useDataStore();
const loginShow = computed({
    get: () => $store.loginShow,
    set: (value) => $store.loginShow = value
});
// 注册显示 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let show = ref(false);
let send = function () {
    show.value = !show.value
}
// 注册显示 ////////////////////////////////////////

// 登录数据 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let loginInfo = reactive({
    email: '583514368@qq.com',
    password: '123456',
})
let { email, password } = toRefs(loginInfo);

let comfirm_Login = async function (params) {
    let res = await login(loginInfo).then((res) => {
        loginShow.value = false;
        return res
    }).catch((err) => {
        console.log(err);
    });
    localStorage.setItem('data', JSON.stringify(res.data));
}
// 登录数据 ////////////////////////////////////////

</script>

<style scoped lang="less">
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
    // flex-direction: column;
}

.after() {
    content: '';
    display: inline-block;
    position: absolute;
}

// ----------------------------------------------

.register-enter-from,
.register-leave-to {
    opacity: 0;
    left: 100%;
}

.register-enter-active,
.register-leave-active {
    transition: all 0.5s;
}

.register-enter-to,
.register-leave-from {
    left: 0%;
}

.login {
    position: absolute;
    z-index: 60;
    top: 0;

    width: 100%;
    height: 100vh;

    overflow: hidden;

    background-color: #fff;

    .header {
        width: 100%;
        height: (60 / @rootsize);
        .displayFlex(center, row);

        span {
            font-size: (15 / @rootsize);
            color: #dbdbdb;
        }

    }

    .main {
        width: 100%;
        position: relative;
        top: (20 / @rootsize);
        .displayFlex(center, column);
        justify-content: center;

        .top,
        .inputs,
        .forget {
            width: 70%;
            .displayFlex(baseline, column);
        }

        .top {
            height: (70 / @rootsize);

            span {
                font-size: (23 / @rootsize);
                color: black;
            }
        }

        .inputs {
            height: (120 / @rootsize);

            input {
                font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
                border: 0;
                outline: none;
                width: 100%;
                height: (40 / @rootsize);
                background-color: #efefef70;
                border-radius: (5 / @rootsize);
                text-indent: (15 / @rootsize);
                font-size: (16 / @rootsize);
                color: #ababab;

                &::placeholder {
                    color: #ababab;
                }
            }
        }

        .forget {
            span {
                font-size: (12 / @rootsize);
                color: #949494;
            }
        }

        .comfirm {
            width: 100%;
            height: (100 / @rootsize);
            .displayFlex(center, column);

            button {
                font-size: (16 / @rootsize);
                width: 70%;
                height: (40 / @rootsize);
                background-color: #FC3058;
                border-radius: (5 / @rootsize);
                color: #fff;
                border: 1px solid #00000000;
            }
        }
    }

}
</style>