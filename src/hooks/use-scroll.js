import { getCurrentInstance } from "vue";

export function move(target, fresh, upload) {
    // 插件注册 getCurrentInstance获取当前组件实例的上下文信息
    const freshing = getCurrentInstance().appContext.config.globalProperties.$freshing;
    const uploading = getCurrentInstance().appContext.config.globalProperties.$uploading;

    if (!fresh) return console.error('没有刷新dom');

    let startY = 0;
    let moveY = 0;

    // 下拉刷新
    function startRefresh(e) {
        startY = e.changedTouches[0].pageY;
    }

    function moveRefresh(e) {
        moveY = e.changedTouches[0].pageY;

        // 检测是否到顶
        if (target.scrollTop == 0 && moveY > startY) {
            freshing(fresh, (startY - moveY) / 3).offInching();
        }

        uploading(upload, (moveY - startY) / 3).offInching();

    }

    // 上拉加载 实时更新后台数据
    async function endRefresh(e) {
        freshing(fresh, 0).onInching();
        uploading(upload, 0).onInching();
        // 判断到底
        if (target.clientHeight + target.scrollTop >= target.scrollHeight - 1) {

        }
    }

    target.addEventListener('touchstart', startRefresh, { passive: true });
    target.addEventListener('touchmove', moveRefresh, { passive: true });
    target.addEventListener('touchend', endRefresh, { passive: true });
}
