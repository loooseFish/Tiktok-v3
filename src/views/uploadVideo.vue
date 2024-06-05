<template>
    <div ref="uploadVideo" class="uploadVideo">
        <div class="header">
            <goback />
            <span>发布动态</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>

        <div class="upload">

            <div v-show="showAttrs == false" class="up">
                <label for="fileUpload">点击上传或者在下方输入url, 推荐使用url</label>
                <input type="file" @change="change" id="fileUpload" />
            </div>
            <video autoplay ref="getVideoDom" v-show="showAttrs" src=""></video>

        </div>

        <div class="attrs">
            <input type="text"
                :value="showAttrs == false ? '' : videoObj.videoUrl.length > 50 ? videoObj.videoUrl.substr(0, 50) + '......' : videoObj.videoUrl"
                placeholder="请输入视频链接(默认本地上传可不填)">
            <input type="text"
                placeholder="请输入封面链接(默认本地上传默认第一帧)">
            <input type="text" v-model="Desc" placeholder="请输入视频描述">
        </div>

        <div class="action">
            <span>预览</span>
            <span @click="upload">发布</span>
        </div>

    </div>
</template>

<script setup>
// API
import { onBeforeMount, onMounted, ref, reactive } from 'vue';

// hooks
import { checkType } from '../hooks/use-checkType';

// axios
import { uploadFile, uploadCover, publishVideo } from '../service/course';

// 组件
import goback from '../components/common/goback.vue';
// 视频上传 \\\\\\\\\\\\\\\\\\\\\\\
// dom元素获取
let getVideoDom = ref(null);
// 变量设置
let showAttrs = ref(false);
let videoObj = reactive({});
let Desc = ref('')

function change(e) {
    // 获取用户选中的文件
    let files = e.target.files;
    if (!files.length) return;
    videoObj.realVideo = files[0];

    checkType(videoObj.realVideo).then(res => {

        if (!res) {
            showAttrs.value = res;
            alert('非MP4格式')
            return
        } else {
            // 限制文件上传大小
            if (videoObj.realVideo.size > (200 * 1024 * 1024)) {
                alert('上传的视频不能大于200MB')
                return
            } else {
                showAttrs.value = res;
            }
        }

    })

    // 返回一个视频地址
    videoObj.videoUrl = getObjectURL(videoObj.realVideo);
}
// 获取视频地址
function getObjectURL(file) {
    let url = null
    if (window.createObjectURL !== undefined) {
        url = window.createObjectURL(file)
    } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(file)
    }
    // 修改视频地址
    getVideoDom.value.src = url;
    // 自动获取视频封面
    getVideoDom.value.addEventListener('loadeddata', captureImage)

    return url
}

function captureImage() {
    // 自动播放
    getVideoDom.value.play()
    let scale = 1
    // 创建canvas画布
    let canvas = document.createElement('canvas')
    // canvas画布大小宽度设置
    canvas.width = getVideoDom.value.videoWidth * scale
    // canvas画布大小宽度设置
    canvas.height = getVideoDom.value.videoHeight * scale
    // 开启2D绘图空间 drawImage()方法绘制一张图像
    canvas.getContext('2d').drawImage(getVideoDom.value, 0, 0, canvas.width, canvas.height)
    // 返回一个包含图片展示的 data URI可以理解为是base64编码的图片
    videoObj.coverUrl = canvas.toDataURL('image/png')
    // 移除事件
    getVideoDom.value.removeEventListener('loadeddata', captureImage)
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

// 上传方法
async function upload() {
    if (!videoObj.realVideo) {
        alert('请先选择要上传的文件')
        return false
    }
    let formData = new FormData();
    formData.append('videoPath', videoObj.realVideo);
    // 请求上传接口
    const result = await uploadFile(formData);

    if (result.status === 200) {
        // 视频文件名
        let filename = result.data.filename // 4hj25hi32h5i23h6i34hi64h3i6.mp4
        // 视频的id截取（要.前面的作为视频的id）
        const videoId = filename.substr(0, filename.indexOf('.'));
        videoObj.videoCover = `http://43.138.15.137:3000/assets/videoCover/${videoId}.jpg`;
        // base64转buffer
        let blob = dataURItoBlob(videoObj.coverUrl);
        // 上传数据组合
        let coverPic = new FormData();
        coverPic.append('videoId', videoId);
        coverPic.append('videoCover', blob);
        // 请求接口
        const resultCover = await uploadCover(coverPic);

        if (resultCover.status === 200 && Desc.value.trim() !== '') {
            const publishResult = await publishVideo({
                videoId,
                videoCover: `http://43.138.15.137:3000/assets/videoCover/${videoId}.jpg`,
                videoPath: `http://43.138.15.137:3000/assets/videoPath/${videoId}.${filename.substr(filename.indexOf('.') + 1)}`,
                videoDesc: Desc.value
            })
        }else{
            alert('简介不得为空')
        }

    }
}


// 视频上传 ///////////////////////

</script>

<style lang="less" scoped>
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
}

.after() {
    content: '';
    display: inline - block;
    position: absolute;
}

// ----------------------------------------------
.uploadVideo {
    position: relative;
    animation: toleft 0.25s linear;
}

.header {
    height: (50 / @rootsize);
    border-bottom: 1px solid #eeeeee20;
    .displayFlex(center, row);
    justify-content: space-between;
}

.upload {
    width: 100%;
    height: (320 / @rootsize);
    .displayFlex(center, row);
    background-color: #000;
    overflow: scroll;

    video {
        width: 100%;
    }

    .up {
        input[type=file] {
            display: none;
        }
    }
}

.attrs {
    width: 100%;
    height: (180 / @rootsize);
    .displayFlex(center, row);
    flex-direction: column;

    input {
        width: 100%;
        height: 25%;
        background-color: #161622;
        border: 1px solid #00000000;
        text-indent: (15 / @rootsize);
        color: #757575;
        outline: none;

        &::placeholder {
            text-indent: (15 / @rootsize);
        }
    }
}

.action {
    height: (50 / @rootsize);
    font-size: (13 / @rootsize);
    .displayFlex(center, row);
}

@keyframes toleft {
    0% {
        left: 100%;
    }

    100% {
        left: 0;
    }
}
</style>
