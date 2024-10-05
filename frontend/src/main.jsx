import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BlogContextProvider } from './context/BlogsContext.jsx'

createRoot(document.getElementById('root')).render(
  <BlogContextProvider>
    <StrictMode>
      <App />
  </StrictMode>,
  </BlogContextProvider>
)
