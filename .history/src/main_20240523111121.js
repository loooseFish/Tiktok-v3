import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
// router
import router from './router'
app.use(router);
// pinia
import { createPinia, PiniaVuePlugin } from 'pinia';
app.use(PiniaVuePlugin);
const pinia = createPinia();
app.use()

app.mount('#app')
