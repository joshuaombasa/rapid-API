const SECRET_KEY = `EURIFEWEICNOERFVNWO`
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    const token = req.header("Authorization")
    if (!token) {
        res.status(400).json("Please login first")
    }
    try {
        const decoded = await jwt.decode(token, SECRET_KEY)
        const userId = decoded.userId
        req.userId = userId
        next()
    } catch (error) {
        res.status(400).json(error)
    }

}