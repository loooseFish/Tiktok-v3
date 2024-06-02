<template>
    <div ref="loading" class="loading"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
let loading = ref(null);

let onInching = function () {
    loading.value.style.transition = 'all 0.6s';
}

let offInching = function () {
    loading.value.style.transition = 'all 0s';
}

defineExpose({ onInching: onInching, offInching: offInching })

</script>

<script>
export default {
    name: "loading"
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
    // flex-direction: column;
}

.after() {
    content: '';
    display: inline-block;
    position: absolute;
}

// ----------------------------------------------
.loading {
    width: 100%;
}
</style>
