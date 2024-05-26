<template>
    <div ref="home" class="home">

        <div ref="content" class="content">

            <div v-for="(item, index) in comData.slice(0, showVideos)" class="filler">
                <div></div>
                <div class="videoLayer">
                    <video :src="extract(comData[index], 'videoPath')" :poster="extract(comData[index], 'videoCover')"
                        webkit-playsinline="" playsinline="" x5-video-player-type="h5" preload="none" class="video"></video>
                </div>
                <div></div>
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
let home = ref(null);
// 变量设置
let startX = ref(0);
let moveX = ref(0);
let defaultY = ref(0);

let showVideos = ref(5);

onMounted(() => {
    home.value.addEventListener('touchstart', (e) => {
        for (let i = 0; i < content.value.children.length; i++) {
            content.value.children[i].children[1].children[0].pause();
        }
        content.value.style.transition = '';
        startX.value = e.changedTouches[0].pageY;
    })
    home.value.addEventListener('touchmove', (e) => {
        moveX.value = e.changedTouches[0].pageY;
        content.value.style.top = (defaultY.value + -(startX.value - moveX.value)) + 'px';
    })
    home.value.addEventListener('touchend', (e) => {
        let nowShowVideo = Math.round((-content.value.offsetTop / content.value.scrollHeight) * content.value.children.length);
        let lastY = (nowShowVideo * content.value.children[0].offsetHeight);
        if (nowShowVideo > showVideos.value - 2) {
            showVideos.value += 5
        }
        if (lastY < 0) {
            defaultY.value = 0;
            content.value.style.transition = 'all 0.3s'
            content.value.style.top = 0 + 'px';
            return
        } else if (content.value.scrollHeight <= -content.value.offsetTop + document.body.clientHeight) {
            defaultY.value = -((content.value.children.length - 1) * content.value.children[0].offsetHeight);
            content.value.style.transition = 'all 0.3s'
            content.value.style.top = -((content.value.children.length - 1) * content.value.children[0].offsetHeight) + 'px';
            return
        } else {
            defaultY.value = -lastY;
            content.value.style.transition = 'all 0.3s'
            content.value.style.top = -lastY + 'px';

            for (let i = 0; i < content.value.children.length; i++) {
                content.value.children[i].children[1].children[0].pause();
            }
            content.value.children[nowShowVideo].children[1].children[0].play();
        }
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
            width: 100%;
            height: 94vh;
            .displayFlex(center, column);

            div {
                width: 100%;
                flex: 1;
            }

            .videoLayer {

                .video {
                    width: 100%;
                    max-height: 94vh;
                }

            }

        }

    }

}
</style>