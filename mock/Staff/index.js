const { Router } = require("express")
const Mock = require("mockjs")
const router = new Router()

const staff = Mock.mock({
    "code": "200",
    "data|16": [
      {
        "id|+1": 1001,
        "name": "@cname",
        "telephone": "@integer(10000000000, 18999999999)",
        "address": "@county(true)",
        "entrydate": "@datetime(\"T\")",
        // "integral": "@integer(100,8000)",
        // "updateTime": "@datetime(T)"
      }
    ]
  })

router
    .post("/api/user/stafflist", (req, res) => {
        res.json(staff)
    })
    // .post("/api/product/details", (req, res) => {
    //     res.json({
    //         "code": "200",
    //         "data|50": [
    //             {
    //             "id|+1": 10000,
    //             "msg": "查看数据详情成功"
    //             }
    //         ]
    //     })
    // })

module.exports = router