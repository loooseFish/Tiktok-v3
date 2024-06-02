import App from '../App.vue'
import { createApp, createVNode, h, render } from 'vue'
const app = createApp(App)

import freshing from '../components/common/freshing.vue'

export function fresh(node = document.body, height = 100) {
    const VNode = createVNode(freshing);
    render(VNode, node);
    VNode.el.style.height = `${-height * 0.26667}vw`;

    return {
        onInching: VNode.component?.exposed.onInching,
        offInching: VNode.component?.exposed.offInching
    }

}