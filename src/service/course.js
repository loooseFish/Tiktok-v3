import http from './http'

//获取视频导航数据
export function videos(params) {
    return http.get('/common/video/getPopularVideo', params)
}