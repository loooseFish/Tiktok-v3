<template>
    <div ref="attention" class="attention">
        <div ref="content" class="content">
            <div class='filler' v-for="item, index in attentions.slice(0, showAttentions)">
                <div class="userinfo">
                    <span>&nbsp;&nbsp;<img :src="`http://43.138.15.137:3000${attentions[index].Video.userAvatar}`"
                            alt=" "></span>
                    <span>&nbsp;&nbsp;@{{ attentions[index].Video.userNickname }}</span>
                </div>
                <div class="intro">
                    <span> &nbsp;&nbsp;{{ attentions[index].Video.videoDesc }}</span>
                </div>
                <div class="videoLayer">
                    <video :src="attentions[index].Video.videoPath" webkit-playsinline="" playsinline=""
                        x5-video-player-type="h5" preload="none" class="video" muted></video>
                    <!-- :poster="attentions[index].Video.videoCover" -->
                </div>
                <div class="attrs">
                    <div>
                        <svg t="1716727112300" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1007" width="25" height="25">
                            <path class="path" fill="#D5D5D5"
                                d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z"
                                p-id="1008"></path>
                        </svg>
                        <span>{{ attentions[index].WSLCNum.likeNum }}</span>
                    </div>
                    <div>
                        <svg t="1716727121815" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1154" width="25" height="25">
                            <path class="path" fill="#D5D5D5"
                                d="M924.3 338.4c-22.5-53.7-54.9-101.9-96.1-143.3-41.2-41.3-89.3-73.8-143-96.3C630.3 75.7 572.1 64 512 64h-2c-60.5 0.3-119 12.3-174.1 35.9-53.2 22.8-100.9 55.2-141.7 96.5-40.8 41.3-72.8 89.3-95 142.8C76.3 394.6 64.7 453.5 65 514.1c0.3 69.4 16.9 138.3 47.9 199.9v152c0 25.4 20.6 46 45.9 46h151.8c61.5 31.1 130.2 47.7 199.5 48h2.1c59.8 0 117.7-11.6 172.3-34.3 53.4-22.3 101.4-54.3 142.5-95.2 41.2-40.9 73.6-88.7 96.3-142 23.5-55.2 35.5-113.9 35.8-174.5 0.2-60.9-11.6-120-34.8-175.6zM312.4 560c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.4 48-47.9 48z m199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.5 48-47.9 48z m199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.5 48-47.9 48z"
                                p-id="1155"></path>
                        </svg>
                        <span>{{ attentions[index].WSLCNum.commentNum }}</span>
                    </div>
                    <div>
                        <svg t="1716727103174" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="860" width="25" height="25">
                            <path class="path" fill="#D5D5D5"
                                d="M752 664c-28.5 0-54.8 10-75.4 26.7L469.4 540.8c1.7-9.3 2.6-19 2.6-28.8s-0.9-19.4-2.6-28.8l207.2-149.9C697.2 350 723.5 360 752 360c66.2 0 120-53.8 120-120s-53.8-120-120-120-120 53.8-120 120c0 11.6 1.6 22.7 4.7 33.3L439.9 415.8C410.7 377.1 364.3 352 312 352c-88.4 0-160 71.6-160 160s71.6 160 160 160c52.3 0 98.7-25.1 127.9-63.8l196.8 142.5c-3.1 10.6-4.7 21.8-4.7 33.3 0 66.2 53.8 120 120 120s120-53.8 120-120-53.8-120-120-120z m0-476c28.7 0 52 23.3 52 52s-23.3 52-52 52-52-23.3-52-52 23.3-52 52-52zM312 600c-48.5 0-88-39.5-88-88s39.5-88 88-88 88 39.5 88 88-39.5 88-88 88z m440 236c-28.7 0-52-23.3-52-52s23.3-52 52-52 52 23.3 52 52-23.3 52-52 52z"
                                p-id="861"></path>
                        </svg>
                        <span>{{ attentions[index].WSLCNum.shareNum }}</span>
                    </div>
                </div>
                <div class="date">
                    &nbsp;
                    {{ new Date(attentions[index].Video.createdAt).getFullYear() }} /
                    {{ new Date(attentions[index].Video.createdAt).getMonth() + 1 }} /
                    {{ new Date(attentions[index].Video.createdAt).getDate() }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// API
import { onBeforeMount, ref, toRaw, onMounted } from 'vue';
// axios
import { attentionInfo } from '../service/course';
// hooks
import { debounce } from '../hooks/use-debounce';
// 数据获取 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let attentions = ref([])
onBeforeMount(async () => {
    await attentionInfo().then(res => { attentions.value = res.data.data });
})
// 数据获取 /////////////////////////////////////////////////////////////////////

// scroll滚动 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// dom元素获取
let attention = ref(null);

let content = ref(null);
// 变量设置
let showAttentions = ref(10);
onMounted(() => {
    let touching = false;

    attention.value.addEventListener('scroll', debounce((e) => {
        if (!touching) {
            if (attention.value.scrollTop + document.body.offsetHeight >= attention.value.scrollHeight) {
                showAttentions.value += 10;
            }
            // e.stopPropagation();
        }
    }));
    content.value.addEventListener('touchstart', () => {
        touching = true;
    });

    content.value.addEventListener('touchmove', () => {
        touching = true;
    });

    content.value.addEventListener('touchend', () => {
        touching = false;
    });

})
// scroll滚动 //////////////////////////////////////////////////////////////////
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
.attention {
    height: 94vh;
    overflow: scroll;

    .content {
        width: 100%;

        .filler {
            width: 80%;
            height: 83.5vh;
            border: 1px solid #161622;
            border-bottom-width: (50 / @rootsize);

            .displayFlex(baseline, column);


            div {
                flex: 1;
                width: 100%;
            }

            .userinfo {
                flex: 1;
                display: flex;
                align-items: center;

                span {
                    font-size: (14 / @rootsize);

                    img {
                        width: (30 / @rootsize);
                        border-radius: 50%;
                    }

                }

            }

            .intro {
                flex: .6;

                span {
                    font-size: (13 / @rootsize);
                }

            }

            .videoLayer {
                position: relative;
                left: (5 / @rootsize);
                flex: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: black;
                border-radius: (5 / @rootsize);


                .video {
                    flex: 1.2;
                    width: 100%;
                    max-height: 64vh;
                    object-fit: cover;
                }
            }

            .attrs {
                width: 70%;
                .displayFlex(center, row);

                svg {
                    position: relative;
                    left: (2 / @rootsize);
                }

                span {
                    position: relative;
                    left: (2 / @rootsize);
                    color: #dadada;
                    font-size: (13 / @rootsize);
                }
            }

            .date {
                flex: .5;
                color: rgb(147, 147, 147);
                font-size: (10 / @rootsize);
            }

        }

    }

}
</style>