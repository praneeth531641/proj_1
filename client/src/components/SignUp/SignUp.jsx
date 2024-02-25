// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const SignUp = ({ handleVerifyEmail, setAction }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();
  const [nameError, setNameError] = useState('');
const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');

const handleNameChange = (event) => {
  const newName = event.target.value;
  setName(newName);

  // Validate name
  if (!newName.trim()) {
    setNameError('Name cannot be empty');
  } else {
    setNameError('');
  }
};

const handleEmailChange = (event) => {
  const newEmail = event.target.value;
  setEmail(newEmail);

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    setEmailError('Enter a valid email address');
  } else {
    setEmailError('');
  }
};

const handlePasswordChange = (event) => {
  const newPassword = event.target.value;
  setPassword(newPassword);

  // Validate password
  if (!newPassword.trim()) {
    setPasswordError('Password cannot be empty');
  } else {
    setPasswordError('');
  }
};

  // const handleNameChange = (event) => setName(event.target.value);
  // const handleEmailChange = (event) => setEmail(event.target.value);
  // const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleOtpChange = (event) => setOtp(event.target.value);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-otp', {
        email,
      });

      if (response && response.data && response.data.message === 'OTP sent successfully') {
        console.log(response.data.message);
        alert('OTP sent successfully');
        setShowOtpInput(true);
      } else {
        console.error('Invalid response:', response);
        alert('Failed to send OTP');
      }
    } catch (error) {
      console.error("Send OTP error:", error.message);
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', {
        email,
        otp,
      });

      if (response && response.data && response.data.message === 'OTP verified successfully') {
        console.log(response.data.message);
        alert('OTP verified successfully');
        handleSignUp();
      } else {
        console.error('Invalid response:', response);
        alert('Please Enter Valid OTP');
      }
    } catch (error) {
      console.error("OTP verification error:", error.message);
      alert('Please Enter Valid OTP');
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', {
        email,
        name,
        password,
      });

      console.log(response.data);
      alert('Signup Successful');
      handleVerifyEmail();
    } catch (error) {
      if(error.response?.data.error !== undefined){alert(error.response.data.error);
    }
  }
  };

  return (
   
    <div className="container3">
       <h1>SignUp</h1>
      <>
      <div className='input'>
  <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
  {nameError && <p className="error-message">{nameError}</p>}
</div>

<div className='input'>
  <input type="email" placeholder="Please enter your Email" value={email} onChange={handleEmailChange} />
  {emailError && <p className="error-message">{emailError}</p>}
</div>

<div className='input'>
  <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
  {passwordError && <p className="error-message">{passwordError}</p>}
</div>

        {!showOtpInput && (
          <div className="submit-container">
            <button className="submit signup" onClick={handleSendOtp}>
              Verify Email
            </button>
          </div>
        )}
        {showOtpInput && (
          <div className='input'>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
            />
            <div className="submit-container">
              <button className="submit signup" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </div>
          </div>
        )}
        <div className="footer">
          <button className="footer-button" onClick={() => navigate('/')}>
            Go Back
          </button>
        </div>
      </>
    </div>
  );
};

export default SignUp;
