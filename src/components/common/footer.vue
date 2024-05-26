<template>
    <div ref="footer" class="footer">
        <div class="block active" @click="checkThis(0, 'home')">首页</div>
        <div class="block noactive" @click="checkThis(1, 'attention')">关注</div>
        <div class="addimg">
            <img src="/src/assets/add.svg" alt="">
        </div>
        <div class="block noactive" @click="checkThis(2, 'info')">消息</div>
        <div class="block noactive" @click="checkThis(3, 'mine')">我的</div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { switchBar } from '../../hooks/use-switchBar';
// 路由优化 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const router = useRouter();
const route = useRoute();
if (router.path !== '/home') {
    router.replace('/home')
}
// 路由优化 ////////////////////////////////////


// 底部切换 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let footer = ref(null);
let oldArr = [];
let newArr = [];

let checkThis = function (index, path) {
    switchBar(newArr, index, 'block active', 'block noactive');

    router.push({ path: `/${path}` });
}

onMounted(() => {
    oldArr = footer.value.children;
    for (let i = 0; i < oldArr.length; i++) {
        if (oldArr[i].className.indexOf('block') != -1) {
            newArr.push(oldArr[i]);
        }
    }
})
// 底部切换 ////////////////////////////////////////

</script>

<style lang="less">
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

.footer {
    z-index: 5;
    position: fixed;
    bottom: 0;

    border-top: (1 / @rootsize) solid #eeeeee36;
    box-shadow: (0 / @rootsize) (-5 / @rootsize) (5 / @rootsize) #eeeeee20; 
    .displayFlex(center, row);

    background-color: black;

    width: 100%;
    height: 7vh;

    .addimg{
        position: relative;
        top: (2 / @rootsize);
        img{
            width: (40 / @rootsize);
        }
    }

    .block {
        font-size: (13.3 / @rootsize);

        img {
            height: (26 / @rootsize);
        }
    }

    .active {
        transition: all 0.2s;
        color: white;
        position: relative;
    }

    .noactive {
        transition: all 0.2s;
        color: rgb(203, 202, 202);
    }

    .active::after {
        transition: all 0.2s;
        .after();
        left: 0;
        bottom: (-7 / @rootsize);
        width: 100%;
        height: (1.2 / @rootsize);
        background-color: white;
    }
}
</style>