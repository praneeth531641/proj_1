// SignUpScreen.js
import React from 'react';

const SignUpScreen = ({ handleNameChange, handleEmailChange, handleSendOtp, handleVerifyOtp, handleSignUp, showOtpInput, isOtpVerified, name, email, otp, password }) => (
  <div>
    <div className='header'>
      <div className='text'>SignUp</div>
      <div className='underLine'></div>
    </div>
    <div className='inputs'>
      <div className='input'>
        <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
      </div>
      <div className='input'>
        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        {!showOtpInput && (
          <button class="verify-otp-button" onClick={handleSendOtp}>Verify Email</button>
        )}
      </div>
      {showOtpInput && (
        <>
          <div className='input'>
            <input type="text" placeholder="Enter OTP" value={otp} />
            <button class="verify-otp-button" onClick={handleVerifyOtp}>Verify OTP</button>
          </div>
          {isOtpVerified && (
            <div className='input'>
              <input type="password" placeholder="Password" value={password}  />
            </div>
          )}
        </>
      )}
    </div>
    <div className="submit-container">
      {!showOtpInput && (
        <div className={`submit submit-signup`} onClick={handleSignUp}>
          SignUp
        </div>
      )}
    </div>
  </div>
);

export default SignUpScreen;
