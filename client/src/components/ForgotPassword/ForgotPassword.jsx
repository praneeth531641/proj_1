
import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const handleEmailChange = (event) => setEmail(event.target.value);

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
                setResetPassword(true);
            } else {
                console.error('Invalid response:', response);
                alert('Enter valid otp to  reset the password');
            }
        } catch (error) {
            console.error("OTP verification error:", error.message);
            alert('Failed to verify OTP');
        }
    };

    const handlePasswordChange = async () => {
        try {
            const response = await axios.post('http://localhost:5000/reset-password', {
                email: email,
                newPassword,
            });

            if (response && response.data && response.data.message === 'Password changed successfully') {
                console.log(response.data.message);
                alert('Password changed successfully');
                // You can redirect the user to the login page or perform any other necessary action
            } else {
                console.error('Invalid response:', response);
                alert('password is not changed');
            }
        } catch (error) {
            console.error("Password change error:", error.message);
            alert('Failed to change password');
        }
    };

    return (
        <div>
            <p>Please enter your email to receive an OTP.</p>
            <div>
                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            </div>
            <div>
                {showOtpInput && (
                    <div>
                        <p>Enter the OTP sent to your email:</p>
                        <div>
                            <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        </div>
                        <div>
                            <button onClick={handleVerifyOtp}>Verify OTP</button>
                        </div>
                    </div>
                )}
                {resetPassword && (
                    <div>
                        <p>Enter your new password:</p>
                        <div>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button onClick={handlePasswordChange}>Change Password</button>
                        </div>
                    </div>
                )}
                {!showOtpInput && !resetPassword && (
                    <button onClick={handleSendOtp}>Send OTP</button>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
