const jwt = require("jsonwebtoken")
require('dotenv').config()

const auth = async (req, res, next)=> {
    // getting token from request headers
    const token = req.header('Authentication')?.replace("Bearer ", "")
    
    if(!token){
        return res.status(400).send("Access denied")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded

        next()
    } catch (error) {
        res.status(400).send("Invalid Token")
    }
}

module.exports = auth