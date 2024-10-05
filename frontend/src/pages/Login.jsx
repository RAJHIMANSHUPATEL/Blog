import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(()=> {
        const token = localStorage.getItem("token")
        if(token){
            navigate("/")
        }
    }, [])

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
                        email,
                        password
                    }
                )
            })
            
            const data = await response.json()
            if(response.ok){
                const token = data.token
                localStorage.setItem('token', token)

                setEmail("")
                setPassword("")
                navigate('/')
            }
            else {
                console.error("Login failed:", data.error)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login