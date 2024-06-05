<template>
    <span @click="goback">
        &nbsp;&nbsp;
        <svg t="1717493399861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2377" width="16" height="16">
            <path
                d="M778.671 926.323a56.811 56.811 0 1 1-80.33 80.331L243.85 552.165a56.811 56.811 0 0 1 0-80.33l454.49-454.49a56.811 56.811 0 1 1 80.33 80.331L364.348 512 778.67 926.323z"
                p-id="2378" fill="#ffffff"></path>
        </svg>
    </span>
</template>

<script setup>
// router
import { useRouter } from 'vue-router';
const router = useRouter();
function goback() {
    router.go(-1)
}

</script>

<style></style>