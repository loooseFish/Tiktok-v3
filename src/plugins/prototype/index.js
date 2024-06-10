import App from '../../App.vue'
import { createApp } from 'vue'
const app = createApp(App)

import { fresh } from '../freshing';
import { upload } from '../uploading';
import { socket } from '../io';

export default {
    install(app) {
        app.config.globalProperties.$freshing = fresh;
        app.config.globalProperties.$uploading = upload;
        app.config.globalProperties.$socket = socket;
    }
}