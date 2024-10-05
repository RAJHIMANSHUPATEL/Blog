const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/blog")
.then(()=> {
    console.log("DB connection successful")
})
.catch((error)=> {
    console.log(error)
})
