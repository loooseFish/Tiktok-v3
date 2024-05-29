import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'
import { useDataStore } from '../store';
import { computed } from 'vue';

import home from '../views/home.vue'
import attention from '../views/attention.vue'
import info from '../views/info.vue'
import mine from '../views/mine.vue'
import login from '../components/home/login.vue'

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
    {
        path: '/login',
        component: login
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    // Pinia数据
    const $store = useDataStore();
    const loginShow = computed({
        get: () => $store.loginShow,
        set: (value) => $store.loginShow = value
    });

    if (to.path == '/home') {
        next();
    } else if (localStorage.getItem('data')) {
        next()
    } else {
        loginShow.value = true;
    }

});

export default router
