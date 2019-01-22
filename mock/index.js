const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

const product = require('./Product')
const user = require('./Users')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use(product)
app.use(user)

app.listen(5000, () => {
    console.log("Runnig in port 5000")
})