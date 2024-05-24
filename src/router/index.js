import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'

import home from '../views/home.vue'
import attention from '../views/attention.vue'
import info from '../views/info.vue'
import mine from '../views/mine.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/home'
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '/attention',
        component: attention
    },
    {
        path: '/info',
        component: info
    },
    {
        path: '/mine',
        component: mine
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
