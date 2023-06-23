const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const routes = require('./routes/router')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', routes)

app.listen(8082, () => {
    console.log("Servidor rodando!");
})