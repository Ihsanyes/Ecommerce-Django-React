// import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './componets/home/Home'
import LoginOtp from './componets/Login/LoginOtp'
import Login from './componets/Login/Login'
import AlreadyLogin from './componets/Login/AlreadyLogin'
import ProductHome from './componets/Products/ProductHome'
import ProductDetail from './componets/Products/ProductDetail'
import Navbar from './componets/Navbar/Navbar'
import ProfileInfo from './componets/settings/Settings'
import About from './componets/About/About'
import Cart from './componets/Products/Cart'
import Addres from './componets/Products/Addres'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const [count, setCount] = useState(0)

  return (
        <div>
          <Navbar/>
            <Routes>
                <Route path='/login' element={<Login/>} />
                <Route path='/' element={<Home/>} />
                <Route path='/login-otp' element={<LoginOtp/>} />
                <Route path='/already-login' element={<AlreadyLogin/>} />
                <Route path='/products/shirts' element={<ProductHome/>} />
                <Route path='/product_detail/:id' element={<ProductDetail/>} />
                <Route path='/settings' element={<ProfileInfo/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/view_cart' element={<Cart/>}/>
                <Route path='/address' element={<Addres/>}/>
                
            </Routes>


        </div>

  )
}

export default App
