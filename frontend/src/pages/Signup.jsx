import { useState } from "react"
import { useNavigate } from "react-router-dom"



function Signup() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
        
    const navigate = useNavigate()
    
    // handleSubmit
    const handleSubmit = async (e)=> {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/api/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        username,
                        email,
                        password
                    }
                )
            })
            
            const data = await response.json()
            if(response.ok){
                const token = data.token
                localStorage.setItem('token', token)

                setUsername("")
                setEmail("")
                setPassword("")
                navigate('/')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className = "login-page">
            <form onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <input 
                    type="text" 
                    className="username"
                    onChange={(e)=> setUsername(e.target.value)}
                    value={username}
                    placeholder="Enter Username"
                />
                <input 
                    type="email" 
                    className="email"
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter email"
                />
                <input 
                    type="password" 
                    className="password"
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter Password"
                />
                <button>Signup</button>
            </form>
        </div>
    )
}

export default Signup