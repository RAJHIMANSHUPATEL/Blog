const express = require("express");
const Blog = require("../models/blogs.models");
const auth  = require("../middlewares/authentication");
const router = new express.Router()


router.post('/api/blogs', auth, async (req, res)=>{
    const {title, body} = req.body
    try {
        const blog = new Blog({
            title,
            body,
            author: req.user.name
        })
        const newBlog = await blog.save()

        res.status(201).json(newBlog)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

// get all blogs 

router.get('/api/blogs', async (req, res)=> {
    try {
        const blog = await Blog.find().sort({createdAt: -1})

        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json(error)
    }
})

// get a single blog
router.get('/api/blogs/:id', async (req, res)=> {
    try {
        const _id = req.params.id
        const blog = await Blog.findById(_id)
        res.status(200).json(blog)
    } catch (error) {
        res.stutus(400).json(error)
    }
})

// delete a blog 
router.delete("/api/blogs/:id",auth, async (req, res)=> {
    try {
        const _id = req.params.id
        const blog = await Blog.findByIdAndDelete(_id)
        
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router