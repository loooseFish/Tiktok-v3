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
        path:'/home',
        com
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router