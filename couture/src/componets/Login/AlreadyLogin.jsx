import {useState} from 'react'
import { Link } from 'react-router-dom'
import { alreadyRegister } from '../auth/auth'
import { useNavigate } from 'react-router-dom'


function AlreadyLogin() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  console.log(email)
  
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await alreadyRegister(email);
      console.log('Otp send successful:', email);
      navigate('/login-otp',{state: { email}});
    } catch (error) {
      console.error('Signup failed:', error);
    }
  }



  return (
    <div className='form-body'>
        <form className='form'onSubmit={handleSubmit}>
            <input type="email"
             className='input-login' 
             placeholder='Email' 
             onChange={(e)=>setEmail(e.target.value)}
            /><br />
            {/* <Link to='/login-otp'> */}
            <button type='submit' className='button'>Conform</button>
            <br />
            {/* </Link> */}
            <Link to='/login' className="already-login">Create New Accout</Link>
        </form>
        <div className="description-container">
          <p className="description">Enter your name and phone number to proceed.</p>
        </div>
        
    </div>
      )
}

export default AlreadyLogin