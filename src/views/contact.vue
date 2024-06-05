<template>
    <div ref="contact" class="contact">
        <div class="header">
            <goback />
            <span>选择联系人</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>

        <div class="search">

            <div class="S_block">
                <div class="S_left">
                    <svg t="1717586917081" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5785" width="16" height="16">
                        <path
                            d="M1008.190624 932.031321l-236.471871-236.471871a431.153179 431.153179 0 1 0-76.157382 76.157382l236.407873 236.471872a53.758152 53.758152 0 0 0 76.157382 0 53.758152 53.758152 0 0 0 0-76.157383zM107.805575 431.184538a323.636875 323.636875 0 0 1 323.316886-323.380884 323.700873 323.700873 0 0 1 323.380883 323.380884 323.636875 323.636875 0 0 1-323.380883 323.316886 323.636875 323.636875 0 0 1-323.316886-323.316886z"
                            fill="#ffffff" opacity=".5" p-id="5786"></path>
                    </svg>
                </div>
                <div class="S_right">
                    <input type="text" placeholder="搜索用户昵称">
                </div>
            </div>

        </div>

        <div ref="content" class="content">

            <dl class="con" v-for="item, key in contacts">
                <dt ref="con_header" class="con_header">{{ key }}</dt>
                <dd class="con_main" v-for="item1, index1 in item">

                    <div class="con_left">
                        <div class="con_img">
                            <img :src="`http://43.138.15.137:3000${item1.userAvatar}`" alt=" ">
                        </div>
                        <div class="con_text">
                            <span>{{ item1.userNickname }}</span>
                            <span>{{ item1.userDesc }}</span>
                        </div>
                    </div>

                    <div class="con_right">
                        <svg t="1717590573597" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="7242" width="18" height="18">
                            <path
                                d="M535.272727 593.454545h-209.454545c-25.6 0-46.545455 20.945455-46.545455 46.545455s20.945455 46.545455 46.545455 46.545455h209.454545c25.6 0 46.545455-20.945455 46.545455-46.545455s-20.945455-46.545455-46.545455-46.545455zM698.181818 384H325.818182c-25.6 0-46.545455 20.945455-46.545455 46.545455s20.945455 46.545455 46.545455 46.545454h372.363636c25.6 0 46.545455-20.945455 46.545455-46.545454s-20.945455-46.545455-46.545455-46.545455z"
                                fill="#ffffff" p-id="7243"></path>
                            <path
                                d="M512 0C230.4 0 0 230.4 0 512v302.545455c0 116.363636 93.090909 209.454545 209.454545 209.454545h302.545455c281.6 0 512-230.4 512-512S793.6 0 512 0z m0 930.909091H209.454545c-65.163636 0-116.363636-51.2-116.363636-116.363636V512c0-230.4 188.509091-418.909091 418.909091-418.909091s418.909091 188.509091 418.909091 418.909091-188.509091 418.909091-418.909091 418.909091z"
                                fill="#ffffff" p-id="7244"></path>
                        </svg>
                    </div>
                </dd>
            </dl>

        </div>


        <div class="attrs">
            <div :class="i === idx ? 'isactive' : ''" v-for="item, key, i in contacts">
                {{ key }}
            </div>
        </div>

    </div>
</template>

<script setup>
// API
import { onBeforeMount, onMounted, ref, reactive } from 'vue';
// 组件
import goback from '../components/common/goback.vue';
// hooks
import { disposeData } from '../hooks/use-disposeData';
import { move } from '../hooks/use-scroll';
import { debounce } from '../hooks/use-debounce';
// axios
import { getContact } from '../service/course';

// 初始数据处理
let contacts = ref([]);
onBeforeMount(async () => {
    // document.elementFromPoint 等待了解，怕误删除，放在这里
    let res = await getContact();
    contacts.value = disposeData(res.data.data, 'userNickname');
})
// 滚动对象选择
// 变量设置
let idx = ref(0);
// dom元素获取
let content = ref(null);
let contact = ref(null);
let con_header = ref(null);
onMounted(() => {
    contact.value.addEventListener('scroll', debounce(() => {
        let closest = null;
        let minDistance = Infinity;

        for (let i = 0; i < con_header.value.length; i++) {
            let distance = contact.value.scrollTop - con_header.value[i].offsetTop;
            if (distance < 0) {
                distance *= -1;
            }
            if (distance < minDistance) {
                // console.log(distance,minDistance);
                closest = [con_header.value[i], i];
                minDistance = distance;
            }
        }
        if (closest) {
            idx.value = closest[1];
        }
    }));
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
    overflow: scroll;

    .header {
        z-index: 10;
        height: (50 / @rootsize);
        border-bottom: 1px solid #eeeeee20;
        .displayFlex(center, row);
        justify-content: space-between;
        background-color: #161622;
    }

    .search {
        height: (70 / @rootsize);
        .displayFlex(center, row);

        .S_block {
            width: 85%;
            height: (50 / @rootsize);
            border-radius: (8 / @rootsize);
            background-color: #242630;

            .displayFlex(center, row);

            .S_left {
                .displayFlex(center, row);
            }

            .S_right {
                .displayFlex(center, row);

                input {
                    width: (250 / @rootsize);
                    background-color: #24263000;
                    border: 1px solid #00000000;
                    outline: none;
                    font-size: (13.5 / @rootsize);
                    color: #a0a2a8;
                }

            }

        }

    }

    .content {
        // width: 100%;
        // height: 100vh;
        // // border: 10px solid #fff;
        // overflow: scroll;

        .con {
            margin: auto;
            width: 85%;
            border-bottom: 1px solid #eeeeee20;

            .con_header {
                position: sticky;
                top: (-1 / @rootsize);
                width: 100%;
                height: (25 / @rootsize);
                font-size: (12.5 / @rootsize);
                line-height: (25 / @rootsize);
                background-color: #161622;
                z-index: 10;
            }

            .con_main {
                width: 100%;
                height: (80 / @rootsize);
                .displayFlex(center, row);
                justify-content: space-between;

                .con_left {
                    width: (300 / @rootsize);

                    .con_img {
                        float: left;
                        width: (50 / @rootsize);
                        height: (50 / @rootsize);
                        border-radius: 50%;
                        overflow: hidden;
                        border: 1px solid #6a6a6a50;


                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }

                    .con_text {
                        height: (50 / @rootsize);
                        position: relative;
                        left: (10 / @rootsize);
                        .displayFlex(baseline, column);

                        span:nth-child(1) {
                            font-size: (13 / @rootsize);
                        }

                        span:nth-child(2) {
                            color: #8B8C96;
                            font-size: (12 / @rootsize);
                        }

                    }

                }

                .con_right {
                    position: relative;
                    right: (10 / @rootsize);
                }

            }
        }
    }
}

.attrs {
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    right: (5 / @rootsize);
    .displayFlex(center, column);

    div {
        transition: all 0.3s;
        font-size: (14 / @rootsize);
        color: #8A8A90;
    }

    .isactive {
        color: #DEB716;
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
