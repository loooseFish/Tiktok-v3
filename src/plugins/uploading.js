import App from '../App.vue'
import { createApp, createVNode, h, render } from 'vue'
const app = createApp(App)

import uploading from '../components/common/uploading.vue';

export function upload(node = document.body, height = 100) {
    const VNode = createVNode(uploading);
    render(VNode, node);
    VNode.el.style.height = `${-height * 0.26667}vw`;

    return {
        onInching: VNode.component?.exposed.onInching,
        offInching: VNode.component?.exposed.offInching
    }

}