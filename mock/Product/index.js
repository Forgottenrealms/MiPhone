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
        "imgs": "@img(120x160,@color,@ctitle)",
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
        "desc": "@cparagraph(1)",
        "sales|7000-12000": 1,
        "shelf|1": ["上架","下架"]
      }
    ]
  })
const lastWeekSales = Mock.mock({
  "code": "200",
  "title": '上周销量',
  "data|7": [
    {
      "week|+1": [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "日"
      ],
      "sales|1000-5000": 1,
    }
  ]
})
const lastMonthSales = Mock.mock({
  "code": "200",
  "title": '上半年销量',
  "data|6": [
    {
      "month|+1": [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月"
      ],
      "sales|8000-15000": 1,
    }
  ]
})
const shelf = Mock.mock({
  "code": "200",
  "data": {
    "msg": "产品下架成功"
    }
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
    .post("/api/product/weeksales/:id", (req, res) => {
      res.json(lastWeekSales)
    })
    .post("/api/product/monthsales/:id", (req, res) => {
      res.json(lastMonthSales)
    })
    .post("/api/product/shelf", (req, res) => {
      res.json(shelf)
    })

module.exports = router