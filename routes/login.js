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

const SECRET_KEY = `EURIFEWEICNOERFVNWO`

const router = express()

router.post('/', [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password whose length is greater than 7").isLength({ min: 7 })
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400).json(errors.array())
    }

    const { email, password } = req.body

    try {
        const connection = await mysql.createConnection(dbConfig)
        const sql = `SELECT id, email, password FROM users WHERE email=?;`
        const [rows] = await connection.query(sql, email)
        if (rows.length === 0) {
            connection.end()
            return res.status(400).json({ message: "User does not exist" })
        }
        if (rows[0].password !== password) {
            return res.status(400).json({ message: "Invalid credentails" })
        }
        const token = jwt.sign({ userId: rows[0].id }, SECRET_KEY, { expiresIn: "1h" })
        connection.end()
        res.status(200).json({ message: "Login successful", token: token })
    } catch (error) {

    }
})