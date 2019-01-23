const { Router } = require("express")
const Mock = require("mockjs")
const router = new Router()

const data = Mock.mock({
    "code": "200",
    "data|15": [
      {
        "id|+1": 1001,
        "price": '￥@float(2000,6000,0,0)',
        "amount|1000-8000": 1,
        "status|1": [
          "热销",
          "降价",
          "即将售罄",
          "在售"
        ],
        "key": "@id",
        "type|+1": [
          "小米MIX 3",
          "小米MAX 3",
          "红米 6",
          "小米8 青春版",
          "小米6X",
          "红米6A",
          "小米8 屏幕指纹版",
          "黑鲨游戏手机 Helo",
          "红米Note 5",
          "小米8",
          "黑鲨游戏手机",
          "小米8 SE",
          "红米Note 7",
          "小米MIX 2S",
          "红米6 Pro"
        ],
        "updateTime": "@datetime(T)",
        "desc": "@cparagraph",
        "sales|7000-12000": 1,
      }
    ]
  })

router
    .post("/api/product/tables", (req, res) => {
        res.json(data)
    })
    .post("/api/product/details/:id", (req, res) => {
        // res.json({
        //     "code": "200",
        //     "data|50": [
        //         {
        //         "id|+1": 10000,
        //         "msg": "查看数据详情成功"
        //         }
        //     ]
        // })
        res.json(data)
    })

module.exports = router