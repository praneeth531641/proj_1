

// import React, { useState } from 'react';
// import './LoginSignUp.css';
// import axios from 'axios';

// import ForgotPassword from '../ForgotPassword/ForgotPassword';
// import DashBoard from '../DashBoard/DashBoard';
// import Welcome from '../Welcome/Welcome';

// const LoginSignUp = () => {
//     const [action, setAction] = useState("Login");
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [newPassword, setNewPassword] = useState(''); // Added state for new password
//     const [loggedIn, setLoggedIn] = useState(true);
//     const [name, setName] = useState("");
//     const [isAdmin, setAdmin] = useState(false);
//     const [usermail, setMail] = useState('');

//     const handleEmailChange = (event) => setEmail(event.target.value);
//     const handlePasswordChange = (event) => setPassword(event.target.value);
//     const handleNameChange = (event) => setName(event.target.value);
//     const handleNewPasswordChange = (event) => setNewPassword(event.target.value); // Added handler for new password

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/login', {
//                 email,
//                 password,
//             });

//             const userData = response.data;
//             setMail(userData.email)

//             if (userData.isAdmin) {
//                 setAdmin(true);
//             }

//             alert('Login Successful');
//             setLoggedIn(false);
           
//         } catch (error) {
//             console.error("Login error:", error.response.data);
//             alert('Login Failed');
//         }
//     };

//     const handleSignUp = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/register', {
//                 name,
//                 email,
//                 password,
//             });
//             console.log(response.data);
//             alert('Signup Successful');
//             setAction("Login");
//         } catch (error) {
//             console.error("Signup error:", error.response.data);
//             alert('Signup Failed');
//         }
//     };

//     // const handleAdminApprove = async () => {
//     //     const adminEmail = prompt("Enter admin email:");
//     //     const adminPassword = prompt("Enter admin password:");
//     //     const userEmailToApprove = prompt("Enter user email to approve:");

//     //     try {
//     //         const response = await axios.post('http://localhost:5000/admin/approve', {
//     //             adminEmail,
//     //             adminPassword,
//     //             userEmailToApprove,
//     //         });
//     //         console.log(response.data);
//     //         alert('User approved by admin');
//     //     } catch (error) {
//     //         console.error("Admin approval error:", error.response.data);
//     //         alert('Admin approval failed');
//     //     }
//     // };

//     // const handleUpdatePassword = async () => {
//     //     // Assuming you have an API endpoint for updating the password
//     //     try {
//     //         const response = await axios.post('http://localhost:5000/update-password', {
//     //             email,
//     //             password,
//     //             newPassword,
//     //         });

//     //         console.log(response.data);
//     //         alert('Password updated successfully');
//     //     } catch (error) {
//     //         console.error("Password update error:", error.response.data);
//     //         alert('Password update failed');
//     //     }
//     // };

//     return (
//             <div className='container'>
//                 {!loggedIn ? (
//                     <div>
//                         <Welcome user={usermail} />
//                         {isAdmin && <DashBoard />}
//                     </div>
//                 ) : (
//                     <>
//                         <div className='header'>
//                             <div className='text'>{action}</div>
//                             <div className='underLine'></div>
//                         </div>
//                         <div className='inputs'>
//                             {action === "SignUp" && (
//                                 <div className='input'>
//                                     <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
//                                 </div>
//                             )}
//                             {action !== "ForgotPassword" && (
//                                 <>
//                                     <div className='input'>
//                                         <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
//                                     </div>
//                                     <div className='input'>
//                                         <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                         {action === "Login" && (
//                             <div className="forgot-password">
//                                 <span onClick={() => setAction("ForgotPassword")}>Lost Password? Click Here</span>
//                             </div>
//                         )}
//                         {action === "ForgotPassword" && <ForgotPassword />}
//                         <div className="submit-container">
//                             <div className={`submit ${action === "Login" ? "gray" : "submit-signup"}`} onClick={action === "Login" ? handleLogin : handleSignUp}>
//                                 {action}
//                             </div>
//                             <div className="submit" onClick={() => setAction(action === "Login" ? "SignUp" : "Login")}>
//                                 {action === "Login" ? "SignUp" : "Login"}
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>
//         );
//     };
   
// export default LoginSignUp;
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

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleNameChange = (event) => setName(event.target.value);
    const handleNewPasswordChange = (event) => setNewPassword(event.target.value);

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

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/register', {
                name,
                email,
                password,
            });
            console.log(response.data);
            alert('Signup Successful');
            setAction("Login");
        } catch (error) {
            console.error("Signup error:", error.response.data);
            alert('Signup Failed');
        }
    };

    return (
        <div className='container'>
            {!loggedIn ? (
                <div>
                    <Welcome user={usermail} />
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
                                    <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                                </div>
                                <div className='input'>
                                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                </div>
                            </>
                        )}
                    </div>
                    {action === "Login" && (
                        <div className="forgot-password">
                            <span onClick={() => setAction("ForgotPassword")}>Lost Password? Click Here</span>
                        </div>
                    )}
                    {action === "ForgotPassword" ? (
                        <ForgotPassword />
                    ) : (
                        <div className="submit-container">
                            <div className={`submit ${action === "Login" ? "gray" : "submit-signup"}`} onClick={action === "Login" ? handleLogin : handleSignUp}>
                                {action}
                            </div>
                            <div className="submit" onClick={() => setAction(action === "Login" ? "SignUp" : "Login")}>
                                {action === "Login" ? "SignUp" : "Login"}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default LoginSignUp;
