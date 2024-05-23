import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
// router
import router from './router'
app.use(router);
// vant
import { Button } from 'vant';
import 'vant/lib/index.css';
app.use(Button);    
// pinia

app.mount('#app')
