import Axios from 'axios';

// 配置axios前缀公共地址

const axios = Axios.create({
    baseURL:  'http://43.138.15.137:4000/api/',
    timeout: 3000,
});
// 设置拦截请求
axios.interceptors.request.use(function (config) {
    // 默认在线权限令牌
    config.headers.Authorization = localStorage.getItem('token');
    return config;
}), function (error) {
    return Promise.reject(error);
}

// 设置响应请求
axios.interceptors.response.use(function (response) {

    return response;
}), function (error) {
    return Promise.reject(error);
}

export default axios;
