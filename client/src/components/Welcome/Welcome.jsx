
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import './Welcome.css';

// // const Welcome = ({ user }) => {
// //     const [newPassword, setNewPassword] = useState('');

// //     const handlePasswordChange = (event) => setNewPassword(event.target.value);

// //     const handleChangePassword = async () => {
// //         try {
// //             const response = await axios.post('http://localhost:5000/change-password', {
// //                 email:user, // Replace with the actual email
// //                 newPassword,
// //             });

// //             console.log(response.data);
// //             alert('Password changed successfully');
// //         } catch (error) {
// //             console.error("Password change error:", error.response.data);
// //             alert('Failed to change password');
// //         }
// //     };

// //     return (
// //         <div>
// //             <h2>Welcome, {user.name}!</h2>
// //             <p>Email: {user}</p>
// //             <div>
// //                 <label>New Password:</label>
// //                 <input type="password" value={newPassword} onChange={handlePasswordChange} />
// //             </div>
// //             <button onClick={handleChangePassword}>Change Password</button>
// //         </div>
// //     );
// // };

// // export default Welcome;

// // Welcome.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import './Welcome.css';
// import '../commom.css';

// const Welcome = ({ user }) => {
//     const [newPassword, setNewPassword] = useState('');

//     const handlePasswordChange = (event) => setNewPassword(event.target.value);

//     const handleChangePassword = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/change-password', {
//                 email:user, // Replace with the actual email
//                 newPassword,
//             });

//             console.log(response.data);
//             alert('Password changed successfully');
//         } catch (error) {
//             console.error("Password change error:", error.response.data);
//             alert('Failed to change password');
//         }
//     };

//     return (
//         <div className="container">
//             <div className="welcome-container">
//                 <h2>Welcome, {user.name}!</h2>
//                 <p>Email: {user}</p>
//                 <div>
//                     <label>New Password:</label>
//                     <input type="password" value={newPassword} onChange={handlePasswordChange} />
//                 </div>
//                 <button onClick={handleChangePassword}>Change Password</button>
//             </div>
//         </div>
//     );
// };

// export default Welcome;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Welcome.css';
import '../commom.css';

const Welcome = ({ user }) => {
    const [userData, setUserData] = useState({});
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        // Fetch additional user data when the component mounts
        fetchUserData();
    }, [user]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/get-user-data?email=${user}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handlePasswordChange = (event) => setNewPassword(event.target.value);

    const handleChangePassword = async () => {
        try {
            const response = await axios.post('http://localhost:5000/change-password', {
                email: user,
                newPassword,
            });

            console.log(response.data);
            alert('Password changed successfully');
        } catch (error) {
            console.error("Password change error:", error.response.data);
            alert('Failed to change password');
        }
    };

    return (
        <div className="container">
            <div className="welcome-container">
                <h2>Welcome!</h2>
                <p>Email: {user}</p>
                {/* <p>Name: {userData.name}</p> */}
                {/* <p>Additional Data: {userData.additionalData}</p> */}
                <div>
                    <label>New Password:</label>
                    <input type="password" value={newPassword} placeholder="enter new password here"onChange={handlePasswordChange} />
                </div>
                <button onClick={handleChangePassword}>Change Password</button>
            </div>
        </div>
    );
};

export default Welcome;
