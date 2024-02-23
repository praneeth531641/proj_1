// VerifyEmail.js

import React, { useState } from 'react';
import axios from 'axios';
import  './VerifyEmail.css';

const VerifyEmail = ({ email, onVerificationSuccess }) => {
    const [otp, setOtp] = useState('');

    const handleOtpChange = (event) => setOtp(event.target.value);

    const handleVerifyEmail = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verify-email', {
                email,
                otp,
            });
            console.log(response.data);
            alert('Email verified successfully');
            onVerificationSuccess();
        } catch (error) {
            console.error("Email verification error:", error.response.data);
            alert('Email verification failed');
        }
    };

    return (
        <div>
            <h2>Verify Email</h2>
            <p>Please enter the OTP sent to your email address.</p>
            <div>
                <input type="text" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} />
            </div>
            <div>
                <button onClick={handleVerifyEmail}>Verify Email</button>
            </div>
        </div>
    );
};

export default VerifyEmail;
