import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import BlogDetails from './components/BlogDetails'
import BlogForm from './components/BlogForm'
import BlogsPage from "./pages/BlogsPage"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BlogsPage />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
