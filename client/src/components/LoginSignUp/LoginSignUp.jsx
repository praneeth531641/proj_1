import React, { useState } from 'react';
import './LoginSignUp.css';
import axios from 'axios';

import ForgotPassword from '../ForgotPassword/ForgotPassword';
import DashBoard from '../DashBoard/DashBoard';
import Welcome from '../Welcome/Welcome';

const LoginSignUp = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);
  const [name, setName] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const [usermail, setMail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(event.target.checkValidity());
  };

  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleNewPasswordChange = (event) => setNewPassword(event.target.value);
  const handleOtpChange = (event) => setOtp(event.target.value);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-otp1', {
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

      if (error.response) {
        console.error("Server response data:", error.response.data);
      }

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
        setIsOtpVerified(true);
      } else {
        console.error('Invalid response:', response);
        alert('Failed to verify OTP');
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
    if (!isOtpVerified) {
      alert('Please verify OTP before logging in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      const userData = response.data;
      setMail(userData.email);

      if (userData.isAdmin) {
        setAdmin(true);
      }

      alert('Login Successful');
      setLoggedIn(false);
    } catch (error) {
      console.error("Login error:", error.response.data);
      alert('Login Failed');
    }
  };

  const handleSignUp = async () => {
    if (!isOtpVerified) {
      alert('Please verify OTP before signing up.');
      return;
    }
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
      setIsEmailTouched(true);
      setIsEmailValid(event.target.checkValidity());
    };

    try {
      const response = await axios.post('http://localhost:5000/register', { email,
        name,
        password,
      });
      console.log(response.data);
      alert('Signup Successful');
      // Trigger email verification after signup
      handleVerifyEmail();
    } catch (error) {
      console.error("Signup error:", error.response.data);
      alert('Signup Failed');
    }
  };
return(
  <div className='container'>
      {!loggedIn ? (
        <div>
          <Welcome user={email} />
          {isAdmin && <DashBoard />}
        </div>
      ) : (
        <>
          <div className='header'>
            <div className='text'>{action}</div>
            <div className='underLine'></div>
          </div>
          <div className='inputs'>
            {action === "SignUp" && (
              <div className='input'>
                <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
              </div>
            )}
            {action !== "ForgotPassword" && (
              <>
                <div className='input'>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => setIsEmailTouched(true)}
                  />
                  {isEmailValid || !isEmailTouched ? null : (
                    <div className="validation-message">Enter Valid  Email format</div>
                  )}
                  {isEmailValid && !showOtpInput && (
                    <button className="verify-otp-button" onClick={handleSendOtp}>Verify Email</button>
                  )}
                </div>
                {showOtpInput && (
                  <>
                    <div className='input'>
                      <input type="text" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} />
                      <button className="verify-otp-button" onClick={handleVerifyOtp}>Verify OTP</button>
                    </div>
                    {isOtpVerified && (
                      <div className='input'>
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          {isOtpVerified && (
            <div className="submit-container">
              <div className={`submit ${action === "SignUp" ? "submit-signup" : "gray"}`} onClick={action === "SignUp" ? handleSignUp : handleLogin}>
                {action === "SignUp" ? "SignUp" : "Login"}
              </div>
            </div>
          )}

          {action === "Login" && (
            <div className="forgot-password">
              <span onClick={() => setAction("ForgotPassword")}>Forgot Password? Click Here</span>
              <div>
                <span onClick={() => setAction("SignUp")}>Don't have an account? Sign up</span>
              </div>
            </div>
          )}
          {action === "ForgotPassword" ? (
            <ForgotPassword />
          ) : null}
        </>
      )}
    </div>
  );
};

export default LoginSignUp;