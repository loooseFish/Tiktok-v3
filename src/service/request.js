// pinia注入
import pinia from '../utils/pinia';

import { useDataStore } from '../store';

const $store = useDataStore(pinia);

import { computed } from 'vue';
const loaderShow = computed({
    get: () => $store.loaderShow,
    set: (value) => $store.loaderShow = value
});

import Axios from 'axios';

// 配置axios前缀公共地址
const axios = Axios.create({
    baseURL: '/api',
    timeout: 3000,
});
// 设置拦截请求
axios.interceptors.request.use(function (config) {
    loaderShow.value = false;
    return config;
}), function (error) {
    return Promise.reject(error);
}

// 设置响应请求
axios.interceptors.response.use(function (response) {
    loaderShow.value = true;
    return response;
}), function (error) {
    return Promise.reject(error);
}

export default axios;
