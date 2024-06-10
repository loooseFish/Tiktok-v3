<template>
    <div class="editout">

        <div class="edit">

            <div class="header">
                <span class="goback" @click="handleSubmit">
                    <svg t="1716857668106" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2737" width="16" height="16">
                        <path
                            d="M770.694737 843.452632L342.231579 512 770.694737 180.547368c18.863158-13.473684 21.557895-37.726316 8.08421-56.589473-13.473684-18.863158-37.726316-21.557895-56.589473-8.084211L250.610526 479.663158c-8.084211 8.084211-13.473684 18.863158-13.473684 32.336842s5.389474 24.252632 16.168421 32.336842l471.578948 363.789474c18.863158 13.473684 43.115789 10.778947 56.589473-8.084211 10.778947-18.863158 8.084211-43.115789-10.778947-56.589473z"
                            fill="#dbdbdb" p-id="2738"></path>
                    </svg>
                </span>
                <span>编辑个人资料</span>
                <span></span>
            </div>
            <div class="main">
                <div class="headPhoto">
                    <div class="photo">
                        <label for="fileUpload">
                            <img ref="head" :src="img.trim() === '' ? 'http://43.138.15.137:3000' + selfData.userAvatar : img" alt=" ">
                        </label>
                        <input @change="cutPhoto" type="file" id="fileUpload" />
                    </div>
                    <div class="text">点击更换头像</div>
                </div>
                <div class="attrs">
                    <div class="attr">
                        <span>昵称</span>
                        <span>{{ selfData.userNickname }}</span>
                    </div>
                    <div class="attr">
                        <span>签名</span>
                        <span>{{ selfData.userDesc }}</span>
                    </div>
                    <div class="attr sex">
                        <span>性别</span>
                        <div @click="showSex" ref="old" class="old">
                            <span>{{ selfData.userGender }}</span>
                            <svg t="1717920404660" class="icon" viewBox="0 0 1048 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="5086" width="11" height="11">
                                <path
                                    d="M565.514 752.186c0.393-0.394 0.491-0.935 0.861-1.326l431.062-392.233c23.201-23.692 23.471-61.882 0.566-85.254-22.906-23.374-60.284-23.126-83.511 0.589l-390.168 355.025-390.933-355.739c-23.224-23.691-60.826-23.716-84.025-0.049-23.174 23.692-23.151 62.079 0.049 85.795l432.096 393.168c23.199 23.692 60.827 23.714 84.001 0.024z"
                                    fill="#ffffff" p-id="5087"></path>
                            </svg>
                        </div>

                        <div ref="now" class="now">
                            <span>男</span>
                            <span>女</span>
                        </div>
                    </div>
                    <div class="attr">
                        <span>年龄</span>
                        <span>{{ selfData.userAge }}</span>
                    </div>
                    <div class="attr">
                        <span>地区</span>
                        <span>{{ selfData.userAddress }}</span>
                    </div>
                </div>
            </div>

        </div>

        <Transition name="cutPhoto">
            <AsyncComp v-if="showCut" :needPhoto="needPhoto" @send="hidCut" />
        </Transition>

    </div>

</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import { selfInfo } from '../../service/course';

const AsyncComp = defineAsyncComponent({
    loader: () => import('./cutPhoto.vue')
})

const props = defineProps(['selfData']);
let selfData = ref(props.selfData);
const emits = defineEmits(['send']);
const handleSubmit = (val = null) => {
    emits('send', val);
}

let now = ref(null);
let old = ref(null);
let sexFlag = ref(false);

let img = ref('');

let showSex = function () {
    sexFlag.value = !sexFlag.value;
    if (sexFlag.value) {
        now.value.style.top = '11.733333vw'
        now.value.style.opacity = 1;
        now.value.style.zIndex = 10;
    } else {
        now.value.style.top = '3.733333vw'
        now.value.style.opacity = 0;
        now.value.style.zIndex = -10;
    }
}

// 截图修改头像
let needPhoto = ref(null);
let showCut = ref(false);
function cutPhoto(e) {
    let files = e.target.files;
    if (!files.length) return;
    needPhoto.value = files[0];
    showCut.value = true;
}

let head = ref(null);

async function hidCut(val) {
    showCut.value = false;
    img.value = val;
}

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

.cutPhoto-enter-from,
.cutPhoto-leave-to {
    opacity: 0;
    left: 100%;
}

.cutPhoto-enter-active,
.cutPhoto-leave-active {
    transition: all 0.5s;
}

.cutPhoto-enter-to,
.cutPhoto-leave-from {
    left: 0%;
}

.edit {
    position: absolute;
    top: 0;
    z-index: 60;

    width: 100%;
    height: 100vh;

    background-color: #161622;

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
        width: 100%;
        .displayFlex(center, column);
        justify-content: center;

        .headPhoto {
            width: 100%;
            height: (210 / @rootsize);

            border-bottom: 1px solid #eeeeee20;
            border-top: 1px solid #eeeeee20;

            .displayFlex(center, column);
            justify-content: center;

            .photo {
                margin-bottom: (10 / @rootsize);

                label {
                    img {
                        width: (120 / @rootsize);
                        height: (120 / @rootsize);

                        border-radius: 50%;

                        object-fit: fill;
                    }
                }

                input[type=file] {
                    display: none;
                }

            }

            .text {
                color: #dbdbdb;
                font-size: (13 / @rootsize);
            }
        }

        .attrs {
            width: 100%;

            .attr {
                margin: auto;
                width: 90%;
                height: (60 / @rootsize);
                .displayFlex(center, row);
                justify-content: space-between;
            }

            .sex {
                position: relative;

                .old {
                    height: 50%;
                    width: (50 / @rootsize);
                    .displayFlex(center, row);
                    background-color: #161622;
                    border: 1px solid #ffffff;
                }

                .now {
                    position: absolute;
                    right: 0;
                    z-index: -10;
                    width: (50 / @rootsize);
                    height: 100%;
                    border: 1px solid #ffffff;
                    .displayFlex(center, column);
                    background-color: #161622;

                    transition: all 0.3s;

                    top: (14 / @rootsize);
                    opacity: 0;
                }

                .now::after {
                    .after();
                    width: 100%;
                    height: (1 / @rootsize);
                    top: 50%;
                    transform: translate(0, -50%);
                    border-top: 1px solid #ffffff;
                }
            }

        }
    }

}
</style>