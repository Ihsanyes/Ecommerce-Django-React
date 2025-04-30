import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import Login from './componets/Login/Login'
// import LoginOtp from './componets/Login/LoginOtp'
// import AlreadyLogin from './componets/Login/Alreadylogin'
// import Navbar from './componets/Navbar/Navbar'
// import Home from './componets/home/Home'
import { BrowserRouter } from'react-router-dom'
import App from './App'
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <App/>
    </BrowserRouter>

    
  </StrictMode>
)
