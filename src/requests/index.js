import axios from 'axios'

const isDEV = process.env.NODE_ENV === "development"
// const ajax = axios.create({
//     // baseURL: isDEV ? "http://rap2api.taobao.org/app/mock/124760" : ""
//     baseURL: isDEV ? "http://10.7.183.118:5000" : ""    // 本地mock数据接口
// })
const ajax1 = axios.create({
    // baseURL: isDEV ? "http://rap2api.taobao.org/app/mock/124760" : 

    // baseURL: isDEV ? "http://10.7.183.66:8888" : ""    // 本地mock数据接口
    
    // baseURL: isDEV ? "http://192.168.43.169:8888" : ""    // 本地mock数据接口
       baseURL: isDEV ? "http://192.168.3.67:8888" : ""    // 本地mock数据接口
})


export const getDataTables = (params) => {
    // console.log(params);
    return ajax1.post("/api/data/tables",params)
}
export const getDataDetails = (id) => {
    return ajax1.post("/api/data/details", id)
}
export const editArticle = (id) => {
    return ajax1.get("/api/data/edit/:id", id)
}
export const saveArticle = (data) => {
    return ajax1.post("/api/data/saveEdit", data)
}