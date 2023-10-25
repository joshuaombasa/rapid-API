const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { check, validationResult } = require("express-validator")
const mysql = require("mysql2/promise")

const dbConfig = {
    host: "localhost",
    user: "root",
    database: "something",
    password: "",

}

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

const userRoutes = require("./routes/user")
const productsRoutes = require("./routes/products")

app.use('/api/users', userRoutes)

app.use('/api/products', productsRoutes)


app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})