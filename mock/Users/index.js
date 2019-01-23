const { Router } = require("express")
const Mock = require("mockjs")
const router = new Router()

const data = Mock.mock({
    "code": "200",
    "data|32": [
      {
        "id|+1": 1,
        "name": "@cname",
        "telephone": "@integer(10000000000, 18999999999)",
        "address": "@county(true)",
        "createAt": "@datetime(\"T\")",
        "integral": "@integer(100,8000)",
        // "updateTime": "@datetime(T)"
      }
    ]
  })

router
    .post("/api/user/userlist", (req, res) => {
        res.json(data)
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