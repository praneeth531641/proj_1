// import React, { useState } from 'react';
// import axios from 'axios';
// import './Welcome.css'

// const Welcome = ({ user }) => {
//     const [newPassword, setNewPassword] = useState('');

//     const handlePasswordChange = (event) => setNewPassword(event.target.value);

//     // const handleChangePassword = async () => {
//     //     try {
//     //         const response = await axios.post('http://localhost:5000/reset-password', {
//     //             newPassword,
//     //         });

//     //         console.log(response.data);
//     //         alert('Password changed successfully');
//     //     } catch (error) {
//     //         console.error("Password change error:", error.response.data);
//     //         alert('Failed to change password');
//     //     }
//     const handleChangePassword = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/change-password', {
//                 user, // Replace with the actual email
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
//         <div>
//             <h2>Welcome, {user.name}!</h2>
//             <p>Email: {user}</p>
//             <div>
//                 <label>New Password:</label>
//                 <input type="password" value={newPassword} onChange={handlePasswordChange} />
//             </div>
//             <button onClick={handleChangePassword}>Change Password</button>
//         </div>
//     );
// };

// export default Welcome;
import React, { useState } from 'react';
import axios from 'axios';
import './Welcome.css';

const Welcome = ({ user }) => {
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChange = (event) => setNewPassword(event.target.value);

    const handleChangePassword = async () => {
        try {
            const response = await axios.post('http://localhost:5000/change-password', {
                email: user, // Replace with the actual email
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
        <div>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user}</p>
            <div>
                <label>New Password:</label>
                <input type="password" value={newPassword} onChange={handlePasswordChange} />
            </div>
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};

export default Welcome;

