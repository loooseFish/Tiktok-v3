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