<template>
    <div class="dynamic">
        <div class="filler"></div>
        <div class="filler"></div>
        <div class="filler"></div>
        <div class="filler"></div>
        <div class="filler"></div>
        <div class="filler"></div>
        <div class="filler"></div>
        <div class="filler"></div>
        <div class="filler"></div>
    </div>
</template>
<script setup>
// API
import { onBeforeMount } from 'vue';
// axios
import { selfVideosInfo } from '../../service/course';
// router
import { useRouter } from 'vue-router';
const router = useRouter();

onBeforeMount(async () => {
    await selfVideosInfo().then(res => console.log(res))
})
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
}

.after() {
    content: '';
    display: inline - block;
    position: absolute;
}

// ----------------------------------------------

</style>