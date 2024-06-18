import { getCurrentInstance } from "vue";

export function move(target, fresh, upload) {
    // 插件注册 getCurrentInstance获取当前组件实例的上下文信息
    const freshing = getCurrentInstance().appContext.config.globalProperties.$freshing;
    const uploading = getCurrentInstance().appContext.config.globalProperties.$uploading;

    if (!fresh) return console.error('没有刷新dom');

    let startY = 0;
    let moveY = 0;
    let endY = 0;
    let freshHeight = fresh.offsetHeight === 0 ? 0 : fresh.offsetHeight;
    let uploadHeight = upload.offsetHeight === 0 ? 0 : upload.offsetHeight;


    // 下拉刷新
    function startRefresh(e) {
        startY = e.changedTouches[0].pageY;
        fresh.style.transition = '';
    }

    function moveRefresh(e) {
        moveY = e.changedTouches[0].pageY;

        // 检测是否到顶
        if (target.scrollTop == 0 && moveY > startY) {
            if(fresh.children.length > 0){
                freshing(fresh, ((startY - moveY) - freshHeight * 5) / 5).offInching();
            }else{
                freshing(fresh, (startY - moveY) / 3).offInching();
            }
            
        }

        uploading(upload, (moveY - startY) / 3).offInching();

    }

    // 上拉加载 实时更新后台数据
    async function endRefresh(e) {
        fresh.style.transition = 'all 0.5s';
        freshing(fresh, freshHeight).onInching();
        uploading(upload, uploadHeight).onInching();
        // 判断到底
        if (target.clientHeight + target.scrollTop >= target.scrollHeight - 1) {

        }
        endY = e.changedTouches[0].pageY;
    }

    target.addEventListener('touchstart', startRefresh, { passive: true });
    target.addEventListener('touchmove', moveRefresh, { passive: true });
    target.addEventListener('touchend', endRefresh, { passive: true });
}
