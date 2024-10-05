const express = require("express");
const blogRouter = require('./routes/blogs.routes');
const userRouter = require('./routes/user.routes');
require('./db/conn')
require("dotenv").config()
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())
app.use(blogRouter);
app.use(userRouter);

app.get("/", (req, res)=> {
    res.send("Hello")
})



app.listen(process.env.PORT, ()=> {
    console.log("Server is running on port 3000")
})