<template>
    <div class="register">
        <div class="header">
            <span @click="handleSubmit">
                <svg t="1716857668106" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2737" width="15" height="15">
                    <path
                        d="M770.694737 843.452632L342.231579 512 770.694737 180.547368c18.863158-13.473684 21.557895-37.726316 8.08421-56.589473-13.473684-18.863158-37.726316-21.557895-56.589473-8.084211L250.610526 479.663158c-8.084211 8.084211-13.473684 18.863158-13.473684 32.336842s5.389474 24.252632 16.168421 32.336842l471.578948 363.789474c18.863158 13.473684 43.115789 10.778947 56.589473-8.084211 10.778947-18.863158 8.084211-43.115789-10.778947-56.589473z"
                        fill="#dbdbdb" p-id="2738"></path>
                </svg>
            </span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="main">
            <div class="top">
                <span>注册</span>
            </div>
            <div class="inputs">
                <input type="text" placeholder="输入邮箱">
                <input type="text" placeholder="输入密码">
                <div class="verify">
                    <input type="text" placeholder="获取验证码">

                    <span class="adsorb">获取验证码</span>
                </div>
            </div>
            <div class="comfirm">
                <button>注册</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const emits = defineEmits(['send'])
const handleSubmit = () => {
    emits('send', null);
}

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

.register {
    position: absolute;
    top: 0;
    z-index: 60;

    width: 100%;
    height: 100vh;

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
            height: (160 / @rootsize);

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
                color: #90909099;

                &::placeholder {
                    color: #90909099;
                }
            }

            .verify {
                position: relative;
                width: 100%;

                .adsorb {
                    position: absolute;
                    top: 50%;
                    transform: translate(0, -50%);
                    right: (12 / @rootsize);

                    font-weight: 700;
                    font-size: (12 / @rootsize);
                    color: #7E8C8D;
                }
            }
        }

        .comfirm {
            width: 100%;
            height: (80 / @rootsize);
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