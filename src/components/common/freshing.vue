<template>
    <div ref="refreshing" class="refreshing">
        <!-- <span>正在刷新</span> -->
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
let refreshing = ref(null);

let onInching = function () {
    refreshing.value.style.transition = 'all 0.6s';
}

let offInching = function () {
    refreshing.value.style.transition = 'all 0s';
}

defineExpose({ onInching: onInching, offInching: offInching })

</script>

<script>
export default {
    name: "refreshing"
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
}

.after() {
    content: '';
    display: inline-block;
    position: absolute;
}

// ----------------------------------------------

.refreshing {
    height: 0;
    max-height: (200 / @rootsize);
    width: 100%;

    .displayFlex(center, row);

    span {
        font-size: (20 / @rootsize);
    }
}
</style>
