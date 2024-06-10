import http from './http'

// 获取视频导航数据 1
export function videos(params) {
    return http.get('/common/video/getPopularVideo', params)
}

// 登录 2
export function login(params) {
    return http.post('/common/user/loginByPassword', params)
}

// 获取关注动态 3
export function attentionInfo(params) {
    return http.get(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/FollowerVideo/page/1`, params)
}

// 获取个人作品与动态集 4
export function selfVideosInfo(params) {
    return http.get(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/Videos/page/1`, params)
}

// 获取个人动态集 5
export function selfLikesInfo(params) {
    return http.get(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/Likes/page/1`, params)
}

// 视频上传 6
export function uploadFile(params) {
    return http.post('/user/uploadFile', params)
}
// 封面上传 7
export function uploadCover(params) {
    return http.post('/user/uploadCover', params)
}
// 上传完整的视频数据 8
export function publishVideo(params) {
    return http.post(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/publishVideo`, params)
}

// 获取联系人列表 9
export function getContact(params) {
    return http.get(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/getContact`, params)
}

// 发送聊天信息 10
export function postLetter(toUserId, params) {
    return http.post(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/privateLetter/${toUserId}`, params)
}

// 获取聊天信息 11
export function getLetter(toUserId) {
    return http.get(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/getPrivateLetter/${toUserId}`)
}

// 读取聊天信息 12
export function readLetter(toUserId) {
    return http.get(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/readPrivateLetter/${toUserId}`)
}

// 获取个人信息 13
export function selfInfo(params) {
    return http.get(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/getUserInfo/undefined`, params)
}

// 上传头像
export function uploadAvatar(params) {
    return http.post(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/uploadAvatar`, params)
}
