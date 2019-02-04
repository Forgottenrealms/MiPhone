const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

const product = require('./Product')
const product1 = require('./Product/Product')
const user = require('./Users')
const staff = require('./Staff')
const comment = require('./Comment')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use(product)
app.use(product1)
app.use(user)
app.use(staff)
app.use(comment)

app.listen(8000, () => {
    console.log("Runnig in port 8000")
})