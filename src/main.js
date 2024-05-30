import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
// router
import router from './router'
app.use(router);
// pinia
import pinia from './utils/index.js'
app.use(pinia);

app.mount('#app')
