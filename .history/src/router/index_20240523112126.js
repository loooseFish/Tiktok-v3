import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'

import home

const routes = [
    {
        path: '/',
        name: 'Home',
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router