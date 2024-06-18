<template>
    <transition name="bounce">
        <div v-if="visible" class="msg-box">
            <span class="msg-text">{{ 'success' }}</span>
        </div>
    </transition>
</template>

<script setup>
import { onMounted, ref } from 'vue';
let props = defineProps(['text']);

let visible = ref(false);

onMounted(() => { 
    visible.value = true;
    let timer = setTimeout(() => {
        visible.value = false;
        clearTimeout(timer);
    }, 1000);
})

</script>

<style scoped lang="less">
// ----------------------------------------------------------------

:root {
    --textSize: (16 / @rootsize);
}

@rootsize: 3.75vw;

.dispalyFlex(@position, @row) {
    display: flex;
    justify-content: space-evenly;
    align-items: @position;
    flex-direction: @row;
}

.after() {
    content: '';
    display: inline-block;
    position: absolute;
}

// ----------------------------------------------------------------

.msg-box {
    position: absolute;
    bottom: 15%;
    left: 40%;

    text-align: center;

    width: 20%;
    display: inline-block;
    padding: (10 / @rootsize) (15 / @rootsize);
    border-radius: (5 / @rootsize);
    min-width: (150 / @rootsize);
    white-space: nowrap;
    margin-left: -10%;
    font-size: (14 / @rootsize);
    background-color: rgba(17, 17, 29, 0.6);
}

.icon-em {
    line-height: (16 / @rootsize);
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    vertical-align: middle;
    margin-right: (5 / @rootsize);
    font-size: (23 / @rootsize);
}

.msg-text {
    vertical-align: middle;
}

.bounce-enter-active {
    animation: bounce-in 0.4s;
    animation-timing-function: linear;
}

.bounce-leave-active {
    animation: bounce-in 0.4s reverse;
    animation-timing-function: linear;
}

@keyframes bounce-in {
    0% {
        bottom: 0%
    }

    100% {
        bottom: 15%;
    }
}
</style>