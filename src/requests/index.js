import axios from 'axios'

const isDEV = process.env.NODE_ENV === "development"
const ajax = axios.create({
    // baseURL: isDEV ? "http://rap2api.taobao.org/app/mock/124760" : ""
    // baseURL: isDEV ? "http://192.168.43.240:5000" : ""
    baseURL: isDEV ? "http://10.7.183.118:5000" : ""    // 本地mock数据接口
})

const ajax2 = axios.create({
    // baseURL: isDEV ? "http://rap2api.taobao.org/app/mock/124859" : ""
    baseURL: isDEV ? "http://192.168.1.103:5000" : ""    // 本地mock数据接口
})
// 商品相关
export const getProductTables = () => {
    return ajax.post("/api/product/tables")
}
export const getProductDetails = (id) => {
    return ajax.post(`/api/product/details/${id}`)
}
export const getProductWeekSales = (id) => {
    return ajax.post(`/api/product/weeksales/${id}`)
}
// 获取用户数据
export const getUsers = () => {
    return ajax2.post("/api/user/userlist")
}