import http from '@/service/http'

//获取首页导航数据
export function getCate(params) {
    return http.get('getcate', params)
}


// 获取热门推荐 上新推荐 所有商品
export function gethortgoods(params) {
    return http.get('gethortgoods', params)
}


// 所有分类
export function getcates(params) {
    return http.get('getcates', params)
}

// 商品列表
export function getgoodlist(params) {
    return http.get('getgoodlist', params)
}

// 商品详细页
export function getgoodsinfo(params) {
    return http.get('getgoodsinfo', params)
}

// 登录
export function login(params) {
    return http.post('login', params)
}

// 支付宝跳转支付
export function alipay(params) {
    return http.post('alipay', params)
}

// 编辑会员信息
export function infoedit(params) {
    return http.post('infoedit', params)
}