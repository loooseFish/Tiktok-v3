import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'
// pinia注入
import { useDataStore } from '../store';
import { computed } from 'vue';

import home from '../views/home.vue'
import attention from '../views/attention.vue'
import info from '../views/info.vue'
import mine from '../views/mine.vue'
import uploadVideo from '../views/uploadVideo.vue';
import contact from '../views/contact.vue';
// home
import login from '../components/home/login.vue'
// mine
import works from '../components/mine/works.vue'
import likes from '../components/mine/likes.vue'
import dynamic from '../components/mine/dynamic.vue'
// uploadVideo


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
        path: '/uploadVideo',
        component: uploadVideo
    },
    {
        path: '/contact',
        component: contact
    },
    {
        path: '/mine',
        component: mine,
        redirect: '/mine/works',
        children: [
            {
                path: 'works',
                component: works,
            },
            {
                path: 'likes',
                component: likes,
            },
            {
                path: 'dynamic',
                component: dynamic,
            },
        ],
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
    const footerShow = computed({
        get: () => $store.footerShow,
        set: (value) => $store.footerShow = value
    });

    if(to.path == '/uploadVideo' || to.path == '/contact'){
        footerShow.value = false;
    }else{
        footerShow.value = true;
    }

    if (to.path == '/home') {
        next();
    } else if (localStorage.getItem('data')) {
        next()
    } else {
        loginShow.value = true;
    }

});

export default router
