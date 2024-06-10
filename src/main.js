import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
// router
import router from './router'
app.use(router);
// pinia
import pinia from './utils/pinia.js'
app.use(pinia);
// 注册全局插件 ----------------------------------------------------
import myPlugin from './plugins/prototype/index.js';
app.use(myPlugin)

app.mount('#app')
