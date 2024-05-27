<template>
    <div ref="home" class="home">

        <div ref="content" class="content">

            <div v-for="(item, index) in comData.slice(0, showVideos)" class="filler">
                <div></div>
                <div class="videoLayer">
                    <video :src="extract(comData[index], 'videoPath')" :poster="extract(comData[index], 'videoCover')"
                        webkit-playsinline="" playsinline="" x5-video-player-type="h5" preload="none"
                        class="video"></video>
                </div>
                <div></div>
                <div class="someAttr">
                    <div ref="someAttrLf" class="someAttrLf">
                        <div></div>
                        <div></div>
                        <div class="videoIntro">
                            <span class="videoFramer">@{{ extract(comData[index], 'userNickname') }}</span>
                            <br>
                            <span>{{ extract(comData[index], 'videoDesc') }}</span>
                            <br>
                        </div>
                    </div>
                    <div ref="someAttrRg" class="someAttrRg">
                        <div></div>
                        <div class="aboutFramer">
                            <div>
                                <img :src="`http://43.138.15.137:3000${extract(comData[index], 'userAvatar')}`" alt=" ">
                            </div>
                            <div>
                                <svg t="1716727112300" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1007" width="50" height="50">
                                    <path class="path" fill="#ffffff"
                                        d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z"
                                        p-id="1008"></path>
                                </svg>
                                <span>{{ extract(comData[index], 'likeNum') }}</span>
                            </div>
                            <div>
                                <svg t="1716727121815" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1154" width="50" height="50">
                                    <path class="path" fill="#ffffff"
                                        d="M924.3 338.4c-22.5-53.7-54.9-101.9-96.1-143.3-41.2-41.3-89.3-73.8-143-96.3C630.3 75.7 572.1 64 512 64h-2c-60.5 0.3-119 12.3-174.1 35.9-53.2 22.8-100.9 55.2-141.7 96.5-40.8 41.3-72.8 89.3-95 142.8C76.3 394.6 64.7 453.5 65 514.1c0.3 69.4 16.9 138.3 47.9 199.9v152c0 25.4 20.6 46 45.9 46h151.8c61.5 31.1 130.2 47.7 199.5 48h2.1c59.8 0 117.7-11.6 172.3-34.3 53.4-22.3 101.4-54.3 142.5-95.2 41.2-40.9 73.6-88.7 96.3-142 23.5-55.2 35.5-113.9 35.8-174.5 0.2-60.9-11.6-120-34.8-175.6zM312.4 560c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.4 48-47.9 48z m199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.5 48-47.9 48z m199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.5 48-47.9 48z"
                                        p-id="1155"></path>
                                </svg>
                                <span>{{ extract(comData[index], 'commentNum') }}</span>
                            </div>
                            <div>
                                <svg t="1716727103174" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="860" width="50" height="50">
                                    <path class="path" fill="#ffffff"
                                        d="M752 664c-28.5 0-54.8 10-75.4 26.7L469.4 540.8c1.7-9.3 2.6-19 2.6-28.8s-0.9-19.4-2.6-28.8l207.2-149.9C697.2 350 723.5 360 752 360c66.2 0 120-53.8 120-120s-53.8-120-120-120-120 53.8-120 120c0 11.6 1.6 22.7 4.7 33.3L439.9 415.8C410.7 377.1 364.3 352 312 352c-88.4 0-160 71.6-160 160s71.6 160 160 160c52.3 0 98.7-25.1 127.9-63.8l196.8 142.5c-3.1 10.6-4.7 21.8-4.7 33.3 0 66.2 53.8 120 120 120s120-53.8 120-120-53.8-120-120-120z m0-476c28.7 0 52 23.3 52 52s-23.3 52-52 52-52-23.3-52-52 23.3-52 52-52zM312 600c-48.5 0-88-39.5-88-88s39.5-88 88-88 88 39.5 88 88-39.5 88-88 88z m440 236c-28.7 0-52-23.3-52-52s23.3-52 52-52 52 23.3 52 52-23.3 52-52 52z"
                                        p-id="861"></path>
                                </svg>
                                <span>{{ extract(comData[index], 'shareNum') }}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { videos } from '../service/course';
import { extract } from '../hooks/use-extract';

// 数据获取 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let comData = ref([]);

onBeforeMount(async () => {
    await videos().then(res => comData.value = res.data.data);
})
// 数据获取 //////////////////////////////////////////////////////////////////

// 屏幕滑动 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// dom元素获取
let content = ref(null);
let someAttrLf = ref(null);
let someAttrRg = ref(null);
// 变量设置
let startX = ref(0);
let moveX = ref(0);
let defaultY = ref(0);
let nowShowVideo = ref(0)
let flagPause = ref(false);
let isMove = ref(false);

let showVideos = ref(5);

onMounted(() => {
    content.value.addEventListener('touchstart', (e) => {
        isMove.value = false;
        content.value.style.transition = '';
        startX.value = e.changedTouches[0].pageY;
    })
    content.value.addEventListener('touchmove', (e) => {
        isMove.value = true;
        moveX.value = e.changedTouches[0].pageY;
        someAttrLf.value[nowShowVideo.value].style.opacity = '.6';
        someAttrRg.value[nowShowVideo.value].style.opacity = '.6';
        content.value.style.top = (defaultY.value + -(startX.value - moveX.value)) + 'px';
    })
    content.value.addEventListener('touchend', (e) => {
        nowShowVideo.value = Math.round((-content.value.offsetTop / content.value.scrollHeight) * content.value.children.length);
        if (nowShowVideo.value < 0) nowShowVideo.value = 0;
        if (isMove.value) {
            let lastY = (nowShowVideo.value * content.value.children[0].offsetHeight);
            if (nowShowVideo.value > showVideos.value - 3) {
                showVideos.value += 5
            }
            if (lastY < 0) {
                defaultY.value = 0;
                content.value.style.transition = 'all 0.3s'
                content.value.style.top = 0 + 'px';
                return
            } else if (content.value.scrollHeight <= -content.value.offsetTop + document.body.clientHeight) {
                nowShowVideo.value = content.value.children.length - 1;
                defaultY.value = -((nowShowVideo.value) * content.value.children[0].offsetHeight);
                content.value.style.transition = 'all 0.3s'
                someAttrLf.value[nowShowVideo.value].style.opacity = '1';
                someAttrRg.value[nowShowVideo.value].style.opacity = '1';
                content.value.style.top = -((nowShowVideo.value) * content.value.children[0].offsetHeight) + 'px';
                return
            } else {
                someAttrLf.value[nowShowVideo.value].style.opacity = '1';
                someAttrRg.value[nowShowVideo.value].style.opacity = '1';
                defaultY.value = -lastY;
                content.value.style.transition = 'all 0.3s'
                content.value.style.top = -lastY + 'px';

                for (let i = 0; i < content.value.children.length; i++) {
                    content.value.children[i].children[1].children[0].currentTime = 0;
                    content.value.children[i].children[1].children[0].pause();
                }
            }
            flagPause.value = true;

            if (!flagPause.value) {
                content.value.children[nowShowVideo.value].children[1].children[0].pause();
            } else {
                content.value.children[nowShowVideo.value].children[1].children[0].play()
            }
            content.value.children[nowShowVideo.value].children[1].children[0].play();
            content.value.children[nowShowVideo.value].children[1].children[0].style.zIndex = '30';
        } else {
            if (e.target.nodeName === 'VIDEO') {
                flagPause.value = !flagPause.value;
                if (!flagPause.value) {
                    content.value.children[nowShowVideo.value].children[1].children[0].pause();
                } else {
                    content.value.children[nowShowVideo.value].children[1].children[0].play()
                }
            }
        }

        return false;
    })
})
// 屏幕滑动 ///////////////////////////////////////////////////////////////////

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
    // flex-direction: column;
}

.after() {
    content: '';
    display: inline-block;
    position: absolute;
}

// ----------------------------------------------
.home {
    overflow: hidden;
    font-size: (14 / @rootsize);

    width: 100%;
    height: 100vh;

    .content {
        position: relative;

        .filler {
            transition: all 0.3s;
            position: relative;
            width: 100%;
            height: 94vh;
            .displayFlex(center, column);

            div {
                width: 100%;
                flex: 1;
            }

            .videoLayer {
                z-index: 30;

                .video {
                    flex: 1.2;
                    width: 100%;
                    max-height: 94vh;
                }

            }

            .someAttr {
                position: absolute;
                top: 0;
                width: 100%;
                height: 93vh;
                .displayFlex(center, row);

                .someAttrLf {
                    // z-index: 40;
                    transition: all 0.3s;
                    opacity: 1;
                    flex: 0.7;
                    height: 93vh;
                    .displayFlex(center, column);
                    font-size: (13 / @rootsize);

                    .videoIntro {
                        .displayFlex(baseline, column);
                        justify-content: end;
                        flex: 0.8;
                        text-indent: (0 / @rootsize);
                        letter-spacing: (1 / @rootsize);
                        color: #eee;

                        .videoFramer {
                            position: relative;
                            top: (8 / @rootsize);
                            font-weight: 700;
                            font-size: (15 / @rootsize);
                        }
                    }

                }

                .someAttrRg {
                    transition: all 0.3s;
                    z-index: 40;
                    position: relative;
                    left: (5 / @rootsize);
                    flex: 0.2;
                    height: 93vh;
                    .displayFlex(baseline, column);

                    div {
                        flex: 1;
                    }

                    .aboutFramer {
                        width: 100%;
                        .displayFlex(baseline, column);

                        div {

                            .displayFlex(center, column);
                            font-size: (13 / @rootsize);

                            .icon {
                                border-radius: 50%;
                                width: 50%;
                                height: 50%;
                                object-fit: fill;

                                .path{
                                    transition: all 0.3s;
                                }
                            }

                            img {
                                border-radius: 50%;
                                width: (50 / @rootsize);
                                height: (50 / @rootsize);
                                object-fit: fill;
                                border: 2px solid #ffffff85;
                                box-shadow: 0 0 (5 / @rootsize) #e2e2e285;
                            }
                        }

                    }
                }

            }

        }

    }

}
</style>