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
        "authority|1-2":false,
        "Mon|1":[
          "",
          "迟到",
          " ",
          "旷工",
          "  ",
          "请假",
          "早退"
        ],
        "Tues|1":[
          "",
          "迟到",
          " ",
          "旷工",
          "  ",
          "请假",
          "早退"
        ],
        "Wed|1":[
          "",
          "迟到",
          " ",
          "旷工",
          "  ",
          "请假",
          "早退"
        ],
        "Thur|1":[
          "",
          "迟到",
          " ",
          "旷工",
          "  ",
          "请假",
          "早退"
        ],
        "Fri|1":[
          "",
          "迟到",
          " ",
          "旷工",
          "  ",
          "请假",
          "早退"
        ],
        "Sat|1":[
          "",
          "迟到",
          " ",
          "旷工",
          "  ",
          "请假",
          "早退"
        ],
      }
    ]
  })

router
    .post("/api/user/stafflist", (req, res) => {
        res.json(staff)
    })
    .post('/api/staff/deleteStaff/:id', (req, res) => {
      // console.log(req.body)
      res.json({
        "code": 200,
        "msg": "删除成功"
      })
    })
    .post('/api/staff/saveStaff', (req, res) => {
      // console.log(req.body)
      res.json({
        "code": 200,
        "msg": "保存成功"
      })
    })
    

module.exports = router