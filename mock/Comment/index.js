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
            "likes|1-200":20,
            "dislikes|1-100":30,
            "action":'null',
            "leaveMessage":[],
             "clickLike":true,
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