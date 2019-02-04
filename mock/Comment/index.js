const { Router } = require('express')
const Mock = require("mockjs")

const getComments=()=>{
    return Mock.mock({
        "code": "200",
        "data|5": [
          {
            "id|":"@id",
            "img": "@image('100x100',@color)",
            "email":"@email()",
            "content": "@cparagraph(2,3)",
            "name":"@cname",
            "likes":0,
            "dislikes":0,
            "action":'null'
          } 
        ],
    })
}


const router = new Router()
router
    .get("/api/data/getComment", (req, res) => {
        res.json(getComments())
    })
module.exports=router