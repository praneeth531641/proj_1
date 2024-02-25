// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setLoggedIn, setAdmin, setMail, setAction }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async () => {
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

  return (
    <>
      <div className='input'>
        <input
          type="email"
          placeholder="Please enter your Email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className='input'>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="submit-container">
        <button className="submit gray" onClick={handleLogin}>
          Login
        </button>
      </div>
      <div className="forgot-password">
        <span onClick={() => setAction("ForgotPassword")}>Forgot Password? Click Here</span>
      </div>
    </>
  );
};

export default Login;
