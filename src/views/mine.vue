<template>
    <div ref="main" class="main">
        <div class="backPic">
            <span>
                <img src="http://43.138.15.137:8080/assets/img/281578538336_.pic_hd.e816ad71.jpg" alt=" ">
            </span>
        </div>
        <div class="self">
            <div class="selfInfo">
                <div class="header">
                    <div class="headPhoto">
                        <span>
                            <img src="http://43.138.15.137:3000/assets/avatar/0c34a42d-f0e1-4f13-ad18-c6cdf7ccc060.png"
                                alt="">
                        </span>
                    </div>
                    <div class="name"><span>范思哲</span></div>
                    <div class="id"><span>抖音号:{{ 1111 }}</span></div>
                </div>
                <div class="body">
                    <div class="intro">666666</div>
                    <div class="sex">
                        <svg t="1717039219694" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2103" width="12" height="12">
                            <path
                                d="M469 638.364c-125.414-20.96-221-130-221-261.364C248 230.644 366.644 112 513 112S778 230.644 778 377c0 130.666-94.57 239.244-219 261.02v64.98h83.328c24.854 0 45 20.148 45 45s-20.146 45-45 45H559v74.912c0 24.852-20.148 45-45 45s-45-20.148-45-45V793H382c-24.852 0-45-20.148-45-45s20.148-45 45-45h87v-64.636z m44-86.364c96.65 0 175-78.35 175-175S609.65 202 513 202 338 280.35 338 377s78.35 175 175 175z"
                                fill="#D36666" p-id="2104"></path>
                        </svg>
                        <span>14岁</span>
                    </div>
                    <div class="selfLine">
                        <span>{{ 16 }}获赞</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>{{ 16 }}关注</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>{{ 16 }}粉丝</span>
                    </div>
                </div>

            </div>
            <div class="wrap">
                <div ref="tab" class="tab">
                    <div class="tab-item isActive" @click="checkRouter('works', 0)">作品&nbsp;{{ 51 }}</div>
                    <div class="tab-item" @click="checkRouter('dynamic', 1);">动态&nbsp;{{ 51 }}</div>
                    <div class="tab-item" @click="checkRouter('likes', 2);">喜欢&nbsp;{{ 78 }}</div>
                </div>
                <div class="content">
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// API
import { onBeforeMount, onMounted, ref } from 'vue';
// axios
import { selfVideosInfo } from '../service/course';
// router
import { useRouter } from 'vue-router';
const router = useRouter();
// hooks
import { switchBar } from '../hooks/use-switchBar';
import { move } from '../hooks/use-scroll';
// 组件

onBeforeMount(async () => {
    // await selfVideosInfo().then(res => console.log(res))
})

// 路由跳转 \\\\\\\\\\\\\\\\\\\\\\\\\\\
let tab = ref(null);
// dom元素获取
let checkRouter = function (path, index) {
    router.push({ path: path });

    switchBar(tab.value.children, index, 'tab-item isActive', 'tab-item')
}
// 路由跳转 //////////////////////////

// // 下拉刷新，上拉加载
// let main = ref(null);
// onMounted(() => {
//     move(main.value);
// })

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
.main {
    height: 94vh;
    overflow: scroll;

    .backPic {
        width: 100%;
        height: (160 / @rootsize);
        text-align: center;

        overflow: hidden;


        span {
            img {
                position: relative;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 105%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .self {
        position: relative;
        .displayFlex(baseline, column);

        .selfInfo {
            width: 100%;

            .header {
                height: (145 / @rootsize);
                position: relative;
                top: (-15 / @rootsize);
                .displayFlex(baseline, column);
                border-bottom: 1px solid #ffffff15;

                .headPhoto {
                    span {
                        img {
                            position: relative;
                            left: (10 / @rootsize);
                            display: block;
                            width: (90 / @rootsize);
                            height: (90 / @rootsize);
                            border-radius: 50%;
                            border: (5 / @rootsize) solid #161622;
                            object-fit: fill;
                        }
                    }
                }

                .name {
                    font-size: (20 / @rootsize);
                    text-indent: (25 / @rootsize);
                }

                .id {
                    font-size: (13 / @rootsize);
                    text-indent: (25 / @rootsize);
                }

            }

            .body {
                position: relative;
                top: (-8 / @rootsize);
                height: (80 / @rootsize);
                .displayFlex(baseline, column);

                .intro {
                    text-indent: (10 / @rootsize);
                    font-size: (12 / @rootsize);
                    color: #8B8C96;
                }

                .sex {
                    position: relative;
                    left: (10 / @rootsize);
                    width: (50 / @rootsize);
                    height: (20 / @rootsize);
                    border-radius: (2 / @rootsize);
                    background-color: #6a6a6a50;
                    .displayFlex(center, row);

                    span {
                        font-size: (12 / @rootsize);
                    }
                }

                .selfLine {
                    position: relative;
                    left: (10 / @rootsize);
                    font-size: (14 / @rootsize);

                    span {
                        color: #eee;

                    }

                }

            }
        }

        .wrap {
            width: 100%;

            .tab {
                width: 100%;
                .displayFlex(center, row);

                .tab-item {
                    transition: all 0.3s;
                    flex: 1;
                    color: #6a6a6a;
                    border-bottom: 2px solid transparent;
                    .displayFlex(center, row);
                    height: (40 / @rootsize);
                }

                .isActive {
                    color: #fff;
                    border-bottom: 2px solid #FACE15;
                }

            }

        }

    }
}
</style>
