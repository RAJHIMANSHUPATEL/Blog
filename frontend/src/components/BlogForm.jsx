import { useEffect, useState } from "react"


const BlogForm = () => {
    const [title, setTitle] = useState("") 
    const [body, setBody] = useState("")

    
    // submitting the form
    const handleSubmit = (e)=> {
        e.preventDefault()
        const token = localStorage.getItem('token')
        
        fetch("http://localhost:4000/api/blogs", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${token}`
            },
            body: JSON.stringify({title, body})
        })

        setTitle("")
        setBody("")
    }

    return (
        <>
            <form>
                <div className="title">
                <input 
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    required
                    />
                </div>
                <div className="body">
                <textarea
                    type="text"
                    placeholder="Body"
                    value={body}
                    onChange={(e)=> setBody(e.target.value)}
                    required
                    />
                </div>
                <button
                type="submit"
                    onClick={handleSubmit}
                    >Create Blog</button>
            </form>
        </>
    )
}

export default BlogForm