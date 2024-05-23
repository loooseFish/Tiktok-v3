import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'

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