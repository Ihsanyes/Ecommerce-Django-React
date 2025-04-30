// import React from 'react'
import './Login.css'
import { useState} from 'react'
import { Link } from 'react-router-dom'
import { register } from '../auth/auth'
import { useNavigate } from 'react-router-dom'


function Login() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate();

  console.log(email, phone)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, phone);
      console.log('Otp send successful:', email, phone);
      navigate('/login-otp',{state: { email, phone }});
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className='form-body'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type="email"
          className='input-login'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="number"
          className='input-login'
          placeholder='Phone number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /><br />
        {/* <Link to='/login-otp'> */}
          <button type='submit' className='button'>Confirm</button>
        {/* </Link> */}
        <Link to='/already-login' className="already-login">
          Already Login this Number
        </Link>
      </form>
      <div className="description-container">
        <p className="description">Enter your name and phone number to proceed.</p>
      </div>
    </div>
  )
}

export default Login
