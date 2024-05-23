import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'

import home from '../views/home'

const routes = [
    {
        path: '/',
        name: 'home',
    },
    {
        path: '/home',
        component: home
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

// history模式
import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'

import home from '../views/home.vue'

const routes = [
    // 路由的默认路径
    {
        path: '/',
        redirect: "/home"
    },
    {
        path: '/home',
        component: home,
    }
]

// 创建路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;
