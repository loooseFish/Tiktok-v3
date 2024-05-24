<template>
    <div ref="home" class="home">

        <div ref="content" class="content">

            <div class="filler">1</div>
            <div class="filler">2</div>
            <div class="filler">3</div>

        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// 屏幕滑动 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// dom元素获取
let content = ref(null);
let home = ref(null);
// 变量设置
let startX = ref(0);
let moveX = ref(0);
let defaultY = ref(0);
onMounted(() => {
    home.value.addEventListener('touchstart', (e) => {
        content.value.style.transition = '';
        startX.value = e.changedTouches[0].pageY;
    })
    home.value.addEventListener('touchmove', (e) => {
        moveX.value = e.changedTouches[0].pageY;
        content.value.style.top = (defaultY.value + -(startX.value - moveX.value)) + 'px';
    })
    home.value.addEventListener('touchend', (e) => {
        let lastY = (Math.round((-content.value.offsetTop / content.value.scrollHeight) * content.value.children.length) * e.target.offsetHeight);
        if (lastY < 0) {
            defaultY.value = 0;
            content.value.style.transition = 'all 0.3s'
            content.value.style.top = 0 + 'px';
            return
        } else if (content.value.scrollHeight <= -content.value.offsetTop + document.body.clientHeight) {
            defaultY.value = -((content.value.children.length - 1) * e.target.offsetHeight);
            content.value.style.transition = 'all 0.3s'
            content.value.style.top = -((content.value.children.length - 1) * e.target.offsetHeight) + 'px';
            return
        } else {
            defaultY.value = -lastY;
            content.value.style.transition = 'all 0.3s'
            content.value.style.top = -lastY + 'px';
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

    width: 100%;
    height: 100vh;

    .content {
        position: relative;

        .filler {
            width: 100%;
            height: 100vh;

            border: 5px solid #a70000;
        }
    }
}
</style>