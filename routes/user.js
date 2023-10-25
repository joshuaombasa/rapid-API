const express = require("express")
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

const router = express()

const requireAuth = require("../middleware/auth")


router.get('/', requireAuth ,async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const sql = `SELECT * FROM users`
        const [rows] = await connection.query(sql)
        connection.end()
        res.status(200).json(rows)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/', [
    check("email","Please provide a valid email").isEmail(),
    check("password", "Please enter a password whose length is greater than 7").isLength({min: 7})
] ,async (req, res) => { 
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        res.status(400).json(errors.array)
    }
    const {firstName, lastName, email, password} = req.body

    try {
        const connection = await mysql.createConnection(dbConfig)
        const sql = `INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)`
        const [rows] = await connection.query(sql,[firstName, lastName, email, password])
        connection.end()
        res.status(200).json(rows)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router