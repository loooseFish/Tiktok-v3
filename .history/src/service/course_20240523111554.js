import http from './http'

//获取首页导航数据
export function getCate(params) {
    return http.get('getcate', params)
}