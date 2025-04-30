import React, { useState, useEffect, useRef } from 'react';
import './LoginOtp.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { verifyOtp } from '../auth/auth';

function LoginOtp() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
    const location = useLocation();
    const { email, phone } = location.state || {}; // Get email and phone from state
    // console.log(email, phone)
//   const emailPara
  
  // Handle OTP input change
  const handleChange = (index, value) => {
      if (/^\d*$/.test(value) && value.length <= 1) {
          const newOtp = [...otp];
          newOtp[index] = value;
          setOtp(newOtp);
          
        // Auto-focus to next input
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    }
};

// Handle backspace
const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
    }
};

// Handle verify
const handleSubmit = async(e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length === 4) {
        // Add your OTP verification logic here
        console.log('OTP:', fullOtp);
      console.log('Verifying OTP:', fullOtp);
      window.location.href = '/';

      // navigate('/'); // Uncomment when verification is successful
    }else{
        console.log('Please enter a valid OTP');
      }
      try {
        await verifyOtp(email,fullOtp);
        //   navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
        navigate('/login-otp');
    }
};


// Handle resend OTP
  const handleResend = (e) => {
    e.preventDefault();
    // Add your resend OTP logic here
    console.log('Resending OTP...');
    setTimeLeft(120);
    setIsResendDisabled(true);
  };

  // Countdown timer
  useEffect(() => {
    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft <= 1) {
        setIsResendDisabled(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='form-body'>
      <form className='form' onSubmit={handleSubmit}>
        <div className="text-container">
          <h3 className='verify-text'>Verify Your Phone Number</h3>
          <p className='send-text'>Please Enter The Verification Code<br/>We Sent To {email}</p>
        </div>

        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              className='otp-input'
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              autoFocus={index === 0}
            />
          ))}
        </div>

        <button type='submit' className='button' disabled={otp.join('').length !== 4}>
          Confirm
        </button>
<br />
        <button 
          onClick={handleResend} 
          className="resend-text"
          disabled={isResendDisabled}
        >
          Resend OTP | Valid up to {formatTime()}
        </button>
      </form>
      
      <div className="description-container">
        <p className="description">Enter your name and phone number to proceed.</p>
      </div>
    </div>
  );
}

export default LoginOtp;