
// import React, { useState } from 'react';
// import './LoginSignUp.css';
// import axios from 'axios';
// import DashBoard from '../DashBoard/DashBoard'

// const LoginSignUp = () => {
//     const [action, setAction] = useState("Login");
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [name, setName] = useState("");
//     const [isAdmin, setAdmin] = useState(false);

//     const handleEmailChange = (event) => setEmail(event.target.value);
//     const handlePasswordChange = (event) => setPassword(event.target.value);
//     const handleNameChange = (event) => setName(event.target.value);

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/login', {
//                 email,
//                 password,
//             });

//             const userData = response.data;

//             if (userData.isAdmin) {
//                 // Set isAdmin state to true for rendering the dashboard button
//                 setAdmin(true);
//                 this.isAdmin =true
//             }

//             // For all users, show a welcome message
//             console.log('Login response:', userData);
//             alert('Login Successful');
//             setLoggedIn(true);
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

//     const handleAdminApprove = async () => {
//         const adminEmail = prompt("Enter admin email:");
//         const adminPassword = prompt("Enter admin password:");
//         const userEmailToApprove = prompt("Enter user email to approve:");

//         try {
//             const response = await axios.post('http://localhost:5000/admin/approve', {
//                 adminEmail,
//                 adminPassword,
//                 userEmailToApprove,
//             });
//             console.log(response.data);
//             alert('User approved by admin');
//         } catch (error) {
//             console.error("Admin approval error:", error.response.data);
//             alert('Admin approval failed');
//         }
//     };

//     return (
//         <div className='container'>
//             {loggedIn ? (
//                 <div>
//                     <h2>Welcome!</h2>
//                     <p>You are now logged in.</p>
//                     {!isAdmin ? (
//                         <button onClick={() => window.location.href = '/DashBoard'}>
//                             Dashboard
//                         </button>
//                     ):<div>just user</div>}
    
//                 </div>
//             ) : (
//                 <>
//                     <div className='header'>
//                         <div className='text'>{action}</div>
//                         <div className='underLine'></div>
//                     </div>
//                     <div className='inputs'>
//                         {action === "SignUp" && (
//                             <div className='input'>
//                                 <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
//                             </div>
//                         )}
//                         <div className='input'>
//                             <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
//                         </div>
//                         <div className='input'>
//                             <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
//                         </div>
//                     </div>
//                     {action === "Login" && (
//                         <div className="admin-approve">
//                             <span onClick={handleAdminApprove}>Admin Approve</span>
//                         </div>
//                     )}
//                     {action === "Login" && <div className="forgot-password">Lost Password?<span>Click Here</span></div>}
//                     <div className="submit-container">
//                         <div className={action === "Login" ? "submit gray" : "submit"} onClick={action === "Login" ? handleLogin : handleSignUp}>{action}</div>
//                         <div className="submit" onClick={() => setAction(action === "Login" ? "SignUp" : "Login")}>{action === "Login" ? "SignUp" : "Login"}</div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default LoginSignUp;
import React, { useState } from 'react';
import './LoginSignUp.css';
import axios from 'axios';
import DashBoard from '../DashBoard/DashBoard'; // Correct the import path

const LoginSignUp = () => {
    const [action, setAction] = useState("Login");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState("");
    const [isAdmin, setAdmin] = useState(false);

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleNameChange = (event) => setName(event.target.value);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            const userData = response.data;
            console.log("hi",response.data)

            if (userData.isAdmin) {
                console.log(userData.isAdmin)
                // Set isAdmin state to true for rendering the dashboard button
                setAdmin(true);
            }

            // For all users, show a welcome message
            console.log('Login response:', userData);
            alert('Login Successful');
            setLoggedIn(true);
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

    const handleAdminApprove = async () => {
        const adminEmail = prompt("Enter admin email:");
        const adminPassword = prompt("Enter admin password:");
        const userEmailToApprove = prompt("Enter user email to approve:");

        try {
            const response = await axios.post('http://localhost:5000/admin/approve', {
                adminEmail,
                adminPassword,
                userEmailToApprove,
            });
            console.log(response.data);
            alert('User approved by admin');
        } catch (error) {
            console.error("Admin approval error:", error.response.data);
            alert('Admin approval failed');
        }
    };

    return (
        <div className='container'>
            {loggedIn ? (
                <div>
                    <h2>Welcome!</h2>
                    <p>You are now logged in.</p>
                    {!isAdmin ? (
    <button onClick={() => window.location.href = '/DashBoard'}>
        Dashboard
    </button>
) : (
    <DashBoard />
)}
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
                        <div className='input'>
                            <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                        </div>
                        <div className='input'>
                            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                        </div>
                    </div>
                    {/* {action === "Login" && (
                        <div className="admin-approve">
                            <span onClick={handleAdminApprove}>Admin Approve</span>
                        </div>
                    )} */}
                    {action === "Login" && <div className="forgot-password">Lost Password?<span>Click Here</span></div>}
                    {/* <div className="submit-container">
                        <div className={action === "Login" ? "submit gray" : "submit"} onClick={action === "Login" ? handleLogin : handleSignUp}>{action}</div>
                        <div className="submit" onClick={() => setAction(action === "Login" ? "SignUp" : "Login")}>{action === "Login" ? "SignUp" : "Login"}</div>
                    </div> */}
                    <div className="submit-container">
<div className={`submit ${action === "Login" ? "gray" : "submit-signup"}`} onClick={action === "Login" ? handleLogin : handleSignUp}>
    {action}
</div>
<div className="submit" onClick={() => setAction(action === "Login" ? "SignUp" : "Login")}>
    {action === "Login" ? "SignUp" : "Login"}
</div>



</div>
                </>
            )}
        </div>
    );
};

export default LoginSignUp;
