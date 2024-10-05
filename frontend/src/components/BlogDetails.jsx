import { useEffect, useState } from 'react'

const BlogDetails = () => {
    const [blogs, setBlogs] = useState(null)
    
    // deleting blogs 
    const handleDelete = async(id)=> {
        try {
            await fetch(`http://localhost:4000/api/blogs/${id}`, {
                method: "Delete"
            })
            console.log("item deleted")
            getBlogs()
        } catch (error) {
            console.log(error)
        }
    }

    // getting blogs
    const getBlogs = async ()=> {
        try {
            const response = await fetch("http://localhost:4000/api/blogs")
            if(!response.ok){
                console.log()
            }
            const data = await response.json()
            setBlogs(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        getBlogs()
    }, [])
    return (
        <div className='blog'>
            {
                blogs? (
                    blogs.map((blog)=> (
                        <div className="blog" key={blog._id}>
                            <h2>{blog.title}</h2>
                            <p>{blog.body}</p>
                            <p>{blog.createdAt}</p>
                            <p>{blog.author}</p>
                            <button 
                                className='delete-btn'
                                onClick={()=> handleDelete(blog._id)}
                            >Delete</button>
                        </div>
                    ))
                ): (
                    <h1>No Blogs</h1>
                )
            }
        </div>
    )
}

export default BlogDetails