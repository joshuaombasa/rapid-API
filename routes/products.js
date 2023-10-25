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



router.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const sql = `SELECT * FROM products`
        const [rows] = await connection.query(sql)
        connection.end()
        res.status(200).json(rows)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const sql = `INSERT INTO products(name, price, quantity) VALUES (?,?,?);`
        const [rows] = await connection.query(sql)
        connection.end()
        res.status(200).json(rows)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router