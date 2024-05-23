import Axios from 'axios';


// 第一步：导入loading服务
// import { Loading } from 'element-ui'
// 第二步：定义一个变量用来接收Loading服务的
// let loadingInstance = null
// 第三步：在请求拦截器打开
// loadingloadingInstance = Loading.service({ text: 'loading加载的文本', spinner: 'loading的icon图标', background: '背景色' })

// 配置axios前缀公共地址

const axios = Axios.create({
    baseURL:  'http://43.138.15.137:4000/api/',
    timeout: 3000,
});

// axios.defaults.baseURL = 'http://43.138.15.137:7777/api/private/v1/';
// axios.defaults.baseURL = 'http://shiyansong.cn:8888/api/private/v1/';

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
