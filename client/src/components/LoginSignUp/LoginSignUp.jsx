import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Welcome from '../Welcome/Welcome';
import DashBoard from '../DashBoard/DashBoard';
import { useNavigate } from 'react-router-dom';

import './LoginSignUp.css';

const LoginSignUp = () => {
  const handleLogout = () => {
    setLoggedIn(false);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [isAdmin, setAdmin] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [passwordError, setPasswordError] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
    // This effect will run when isOtpVerified changes
    if (isOtpVerified) {
      handleLogin();
    }
  }, [isOtpVerified]);

  const handleEmailChange = (event) => {
    setIsEmailTouched(true);
    setEmail(event.target.value);
    setIsEmailValid(event.target.checkValidity());
  };

  const handlePasswordChange = (event) =>{const newPassword = event.target.value;
  setPassword(newPassword);

  // Validate password
  if (!newPassword.trim()) {
      setPasswordError('Password cannot be empty');
  } else {
      setPasswordError('');
  }
};
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
        setEmailVerified(true);
        setIsOtpVerified(true);
      } else {
        console.error('Invalid response:', response);
        alert('Please Enter Valid OTP');
      }
    } catch (error) {
      console.error("OTP verification error:", error.message);
      alert('Failed to verify OTP');
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-email', {
        email,
        otp,
      });
      console.log(response.data);
      alert('Email verified successfully');
      // Trigger OTP sending after email verification
      handleSendOtp();
    } catch (error) {
      console.error("Email verification error:", error.response.data);
      alert('Email verification failed');
    }
  };

  const handleLogin = async () => {
    try {
      const loginResponse = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      const userData = loginResponse.data;
      setEmail(userData.email);

      if (userData.isAdmin) {
        setAdmin(true);
      }

      alert('Login Successful');
      setLoggedIn(false);
    } catch (error) {
      console.error("Login error:", error.message);
      alert('Login Failed');
    }
  };

  return (
    <div className='container'>
      {!isLoggedIn ? (
        <div>
          <Welcome user={email} onLogout={handleLogout} />
          {isAdmin && <DashBoard />}
        </div>
      ) : (
        <>
          <div className='header'>
            <div className='text'>Login</div>
            <div className='underLine'></div>
          </div>
          <div className='inputs'>
            <div className='input'>
              <input
                type="email"
                placeholder="Please enter your Email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => setIsEmailTouched(true)}
              />
              {isEmailValid || !isEmailTouched ? null : (
                <div className="validation-message">Enter Valid Email Id</div>
              )}
            </div>
            {/* <div className='input'>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div> */}
            

<div className='input'>
    <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
    />
    {passwordError && <p className="error-message">{passwordError}</p>}
</div>
            <div className='submit-container'>
              {!showOtpInput && (
                <button className='submit green' onClick={handleSendOtp}>
                  Login
                </button>
              )}
            </div>
            <div className='input'>
              {showOtpInput && !isEmailVerified && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <div className='submit-container'>
                    <button className='submit blue' onClick={handleVerifyOtp}>
                      Verify Otp
                    </button>
                  </div>
                </>
              )}
            </div>
            {/* {isOtpVerified && (
              <div className='submit-container'>
                <button className='submit green' onClick={handleLogin}>
                  Login
                </button>
              </div> */}
            {/* )} */}
          </div>
          <div className='footer'>
            <button className='footer-button' onClick={() => navigate('/signup')}>
              Sign Up
            </button>
            <button className='footer-button' onClick={() => navigate('/forgot-password')}>
              Forgot Password
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginSignUp;
