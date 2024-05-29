export function double_click(el, fn1, fn2) {
    // let timestamp = 0;
    // el.addEventListener('click', () => {
    //     const now = +new Date();
    //     if (now - timestamp <= 300) {
    //         fn1();
    //         timestamp = 0;
    //     } else {
    //         fn2()
    //         timestamp = now;
    //     }
    // });
    let clickid = 1;
    let timer = null;
    let startTime = null;

    el.addEventListener('click', () => {
        if (clickid == 1) {
            startTime = new Date().getTime();
            clickid++;
            timer = setTimeout(function () {
                fn1(); // 单击事件触发
                clickid = 1;
            }, 300)
        }
        
        if (clickid == 2) {
            clickid++;
        } else {
            var endTime = new Date().getTime();
            if ((endTime - startTime) < 300) {
                fn2(); // 双击事件
                clickid = 1;
                clearTimeout(timer);
            }
        }
    })

}
