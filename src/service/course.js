import http from './http'

// 获取视频导航数据
export function videos(params) {
    return http.get('/common/video/getPopularVideo', params)
}

// 登录
export function login(params) {
    return http.post('/common/user/loginByPassword', params)
}

// 获取关注动态
export function attentionInfo(params) {
    return http.get(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/FollowerVideo/page/1`, params)
}

// 获取个人作品与动态集
export function selfVideosInfo(params) {
    return http.get(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/Videos/page/1`, params)
}

// 获取个人动态集
export function selfLikesInfo(params) {
    return http.get(`/user/${JSON.parse(localStorage.getItem('data')).data.userId}/Likes/page/1`, params)
}