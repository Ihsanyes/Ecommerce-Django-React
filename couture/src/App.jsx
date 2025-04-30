// import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './componets/home/Home'
import LoginOtp from './componets/Login/LoginOtp'
import Login from './componets/Login/Login'
import AlreadyLogin from './componets/Login/AlreadyLogin'
import ProductHome from './componets/Products/ProductHome'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const [count, setCount] = useState(0)

  return (
        <div>
          
            <Routes>
                <Route path='/login' element={<Login/>} />
                <Route path='' element={<Home/>} />
                <Route path='/login-otp' element={<LoginOtp/>} />
                <Route path='/already-login' element={<AlreadyLogin/>} />
                <Route path='/products/shirts' element={<ProductHome/>} />
            </Routes>


        </div>

  )
}

export default App
