<template>
    <div class="cutPhoto">
        <div class="header">
            <span class="goback" @click="handleSubmit">
                <svg t="1716857668106" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2737" width="16" height="16">
                    <path
                        d="M770.694737 843.452632L342.231579 512 770.694737 180.547368c18.863158-13.473684 21.557895-37.726316 8.08421-56.589473-13.473684-18.863158-37.726316-21.557895-56.589473-8.084211L250.610526 479.663158c-8.084211 8.084211-13.473684 18.863158-13.473684 32.336842s5.389474 24.252632 16.168421 32.336842l471.578948 363.789474c18.863158 13.473684 43.115789 10.778947 56.589473-8.084211 10.778947-18.863158 8.084211-43.115789-10.778947-56.589473z"
                        fill="#dbdbdb" p-id="2738"></path>
                </svg>
            </span>
            <span>截取新头像</span>
            <span></span>
        </div>

        <div class="main">

            <canvas id="canvas" ref="canvas"></canvas>
            <!-- 画布 -->
            <canvas id="clipcanvas" ref="clipcanvas"></canvas>

        </div>

        <button class="confirm" type="button" ref="confirm">确认上传</button>

    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { uploadAvatar } from '../../service/course';

const props = defineProps(['needPhoto']);
let photo = ref(props.needPhoto);
const emits = defineEmits(['send']);

const handleSubmit = (val = '') => {
    emits('send', val);
}

// 截图
let canvas = ref(null);
let clipcanvas = ref(null);
let confirm = ref(null);
let postData = ref('');

onMounted(() => {
    canvas.value.width = document.body.clientWidth;
    canvas.value.height = document.body.clientHeight - (document.body.clientHeight / 10);

    clipcanvas.value.width = document.body.clientWidth;
    clipcanvas.value.height = document.body.clientHeight - (document.body.clientHeight / 10);

    const ctx = canvas.value.getContext("2d");

    const baseW = 400;
    const flagW = 10;
    let bgConfig;
    let flagConfig;

    (async function () {
        try {
            clipcanvas.value.width = canvas.value.clientWidth;
            clipcanvas.value.height = canvas.value.clientHeight;
            const img = await getImageObj(photo.value);
            const rate = compress(img, baseW);
            bgConfig = [img, 0, 0, img.width, img.height, 0, 0, rate.w, rate.h];

            drawn();
        } catch (error) {
            console.error(error);
        }
    })();

    function drawn() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        if (bgConfig) {
            ctx.drawImage(...bgConfig);
        }
        if (flagConfig) {
            ctx.drawImage(...flagConfig);
        }
    }

    //图片压缩,获取等比缩放后的结果
    function compress(img, base) {
        let w = img.width;
        let h = img.height;
        if (img.width > img.height) {
            // 新的 宽比 高 = 旧的宽比高  h / w = img.height /img.width  ;
            if (img.width > base) {
                //要将宽度缩放
                w = base;
                h = (w / img.width) * img.height;
            }
        } else {
            //要将高度缩放
            if (img.height > base) {
                h = base;
                w = (h / img.height) * img.width;
            }
        }
        return {
            w,
            h,
        };
    }


    function getImageObj(file) {
        const url = getObjectURL(file);
        const img = new Image();
        img.src = url;
        return new Promise((resolve, reject) => {
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function (e) {
                reject(e);
            };
        });
    }

    function getObjectURL(file) {
        let url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }

    //截图
    let clipctx = clipcanvas.value.getContext("2d");
    let start = ref(null);
    let clipArea = ref({}); //裁剪范围

    clipcanvas.value.addEventListener('touchstart', (e) => {
        confirm.value.style.display = 'none';

        start.value = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY,
        };
    }, { passive: true });

    clipcanvas.value.addEventListener('touchmove', (e) => {
        if (start.value) {

            var startX = start.value.x;
            var startY = start.value.y;
            var touchX = e.changedTouches[0].pageX;
            var touchY = e.changedTouches[0].pageY;

            fill(startX, startY - (startY / 5), touchX - startX, (touchY - touchY / 10) - startY);
        }
    }, { passive: true })

    document.addEventListener("touchend", function () {
        if (start.value) {
            start.value = null;

            postData.value = startClip(clipArea.value);
            confirm.value.style.display = 'block';
        }
    });

    confirm.value.addEventListener('click', async () => {
        let res = await uploadAvatar({ fieldName: `${postData.value}` });

        postData.value = startClip(clipArea.value);

        if (res.status === 200) {
            handleSubmit(postData.value);
        }
    })

    function fill(x, y, w, h) {
        clipctx.clearRect(0, 0, clipcanvas.value.width, clipcanvas.value.height);
        clipctx.beginPath();
        clipctx.fillStyle = "rgba(0,0,0,0.6)";
        clipctx.strokeStyle = "green";
        //遮罩层
        clipctx.globalCompositeOperation = "source-over";
        clipctx.fillRect(0, 0, clipcanvas.value.width, clipcanvas.value.height);
        //画框
        clipctx.globalCompositeOperation = "destination-out";
        clipctx.fillRect(x, y, w, h);
        //描边
        clipctx.globalCompositeOperation = "source-over";
        clipctx.moveTo(x, y);
        clipctx.lineTo(x + w, y);
        clipctx.lineTo(x + w, y + h);
        clipctx.lineTo(x, y + h);
        clipctx.lineTo(x, y);
        clipctx.stroke();
        clipctx.closePath();
        clipArea.value = {
            x,
            y,
            w,
            h,
        };

    }

    function startClip(area) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");

        canvas.width = area.w;
        canvas.height = area.h / 2;

        // ctx.canvas.willReadFrequently = true;
        var data = ctx.getImageData(area.x, area.y, area.w, area.h);

        context.putImageData(data, 0, 0);
        return canvas.toDataURL("image/png");
    }

    // 转buffer
    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1])
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ab], { type: mimeString })
    }

})

</script>

<style scoped lang="less">
// ----------------------------------------------
:root {
    --textSize: (16 / @rootsize);
}

@rootsize: 3.75vw;

.displayFlex(@position, @row) {
    display: flex;
    justify-content: space-evenly;
    align-items: @position;
    flex-direction: @row;
    // flex-direction: column;
}

.after() {
    content: '';
    display: inline-block;
    position: absolute;
}

// ----------------------------------------------

.cutPhoto {
    position: absolute;
    top: 0;
    z-index: 60;

    width: 100%;
    height: 100vh;

    background-color: #161622;

    .confirm {
        display: none;
        position: absolute;
        top: (60 / @rootsize);
        right: (10 / @rootsize);
        outline: none;
        color: #eee;
        width: (80 / @rootsize);
        height: (30 / @rootsize);
        background-color: #47733C;
        border: 1px solid #00000000;
        border-radius: (5 / @rootsize);
    }

    .header {
        width: 100%;
        height: (45 / @rootsize);
        .displayFlex(center, row);

        span {
            font-size: (16 / @rootsize);
            color: #dbdbdb;
        }

        .goback {
            position: relative;
            left: (-40 / @rootsize);
        }

    }

    .main {
        position: relative;

        /* 画布 */
        #clipcanvas {
            position: absolute;
            top: 0;
            left: 0;
        }

    }

}
</style>