const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = new express()

const product = require('./Product/Product')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use(product)

app.listen(8888, () => {
    console.log("Runnig in port 8888")
})