const { Router } = require('express')
const Mock = require("mockjs")

const articleList=({offset=0,limited=10,totalCount=48})=>{
    const id=offset+1000;
    //判断是不是最好一页
    const currentpage=offset/limited+1;
    const isLastPage=currentpage>totalCount/limited;
    const dataCount=isLastPage?totalCount/limited:limited;
    const data=`data|${dataCount}`;
    return Mock.mock({

        "code": "200",
        [data]: [
          {
            "id|+1": id,
            "customer": "@cname",
            "price": "@float(10,1000,1,1)0￥",
            "amount": "@integer(1,20)",
            "createAT": "@datetime(T)",
            "record|+1": 0,
            "shipTo": "@cname",
            "Status|1": [
              "Pending",
              "On Hold",
              "Closed",
              "Fraud"
            ],
            "key": '@id'
          }
        ],
        currentpage:offset / limited + 1,
        totalCount:totalCount

    })
}
const articleEdit=(id)=>{
    return Mock.mock(
        {
            data:{
                  "id":1000,
                  "customer": "@cname",
                  "price": "@float(10,1000,1,1)0￥",
                  "createAT": "@datetime(T)",
                  "shipTo": "@cname",
                  "Status|1": [
                    "Pending",
                    "On Hold",
                    "Closed",
                    "Fraud"
                  ],
                  "content":'<p>@cparagraph(4,8)</p>'
                  
                } 
        })
}

const router = new Router()
router
    .post("/api/data/tables", (req, res) => {
        res.json(articleList(req.body))
    })
    .post("/api/data/details", (req, res) => {
        res.json({
            "code": "200",
            "data|50": [
                {
                "id|+1": 10050,
                "msg": "查看数据详情成功"
                }
            ]
        })
    }).get("/api/data/edit/:id",(req,res)=>{
        
        res.json(articleEdit(req.params.id))
    }).post("/api/data/saveEdit",(req,res)=>{
        console.log(res.body)
        res.json({

            code:200,
            msg:'保存成功'
        })
    })

module.exports=router