const { Router } = require("express")
const Mock = require("mockjs")
const router = new Router()

const user = Mock.mock({
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
        res.json(user)
    })
    .post("/api/user/deleteUser/:id", (req, res) => {
      res.json({
        "code": 200,
        "msg": "删除成功"
      })
    })
    .post("/api/user/:id", (req, res) => {
      res.json(user(req.params.id))
    })
    .post('/api/user/saveUser', (req, res) => {
      // console.log(req.body)
      res.json({
        "code": 200,
        "msg": "保存成功"
      })
    })
  
module.exports = router