import App from '../App.vue'
import { createApp, createVNode, h, render } from 'vue'
const app = createApp(App)

import freshing from '../components/common/freshing.vue'

export function fresh(node = document.body, height = 160) {
    const VNode = createVNode(freshing);
    render(VNode, node);

    height = height < 0 ? -height : height;

    if (node.children.length > 1) {
        node.style.height = `${height * 0.26667}vw`;
    } else {
        VNode.el.style.height = `${height * 0.26667}vw`;
    }

    return {
        onInching: VNode.component?.exposed.onInching,
        offInching: VNode.component?.exposed.offInching
    }

}