<template>
    <div>我是我的</div>
</template>

<script setup>
// Pinia注入
import { useDataStore } from '../store';
import { computed } from 'vue'
const $store = useDataStore();
const loginShow = computed({
    get: () => $store.loginShow,
    set: (value) => $store.loginShow = value
});

if (localStorage.getItem('data')) {
    loginShow.value = false;
} else {
    loginShow.value = true;
}

</script>
