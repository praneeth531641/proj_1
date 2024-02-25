// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Welcome.css';
// import { useNavigate } from 'react-router-dom';

// const Welcome = ({ user }) => {
//   const [userData, setUserData] = useState({});
//   const [newPassword, setNewPassword] = useState('');
//   const [isChangingPassword, setIsChangingPassword] = useState(false);
//   const [isClicked, setisClicked] = useState(false);
//   const [isnotClicked, setisnotClicked] = useState(true);

//   useEffect(() => {
//     // Fetch additional user data when the component mounts
//     fetchUserData();
//   }, [user]);

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/get-user-data?email=${user}`);
//       setUserData(response.data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   const navigate = useNavigate();

//   const handlePasswordChange = (event) => {
//     setisnotClicked(true);
//     setNewPassword(event.target.value)};
//   const handleDisplay = () => {
//     setisClicked(!isClicked)}
//     ;

//   const handleChangePassword = async () => {
//     try {
//       setisnotClicked(false);

//       setIsChangingPassword(true);
//       const response = await axios.post('http://localhost:5000/change-password', {
//         email: user,
//         newPassword,
//       });

//       console.log(response.data);
//       alert('Password changed successfully');
//     } catch (error) {
//       console.error('Password change error:', error.response.data);
//       alert('Failed to change password');
//     } finally {
//       setIsChangingPassword(false);
//     }
//   };

//   return (
//     <div className="container1">
//       <div className="welcome-container">
//         <h2>Welcome!</h2>
//         <p>Email: {user}</p>
//         <div className="mb-3">
//           {isClicked && (
//             <>
//               <label className="form-label">New Password:</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={newPassword}
//                 placeholder="Enter new password here"
//                 onChange={handlePasswordChange}
//               />

//               <button
//                 className="btn btn-primary"
//                 onClick={handleChangePassword}
//                 disabled={isChangingPassword}
//               >
//                 {isChangingPassword ? 'Changing Password...' : 'Change Password'}
//               </button>
//             </>
//           )}
//         </div>
//         {isnotClicked && (
//             <> <button onClick={handleDisplay}>
//            Wanna Change the  Password
//         </button>
//         </>
//         )}
//       </div>

//       <div className="footer mt-3">
//         <button className="btn btn-secondary" onClick={() => navigate('/')}>
//           LogOut
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Welcome;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';

const Welcome = ({ user }) => {
  const [userData, setUserData] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isClicked, setisClicked] = useState(false);
  const [isnotClicked, setisnotClicked] = useState(true);

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

  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setisnotClicked(true);
    setNewPassword(event.target.value);
  };

  const handleDisplay = () => {
    setisClicked(!isClicked);
  };

  const handleChangePassword = async () => {
    try {
      setisnotClicked(false);
      setIsChangingPassword(true);

      const response = await axios.post('http://localhost:5000/change-password', {
        email: user,
        newPassword,
      });

      console.log(response.data);
      alert('Password changed successfully');
    } catch (error) {
      console.error('Password change error:', error.response.data);
      alert('Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="container1">
      <div className="welcome-container">
        <h2>Welcome!</h2>
        <p>Email: {user}</p>
        <div className="mb-3">
          {isClicked && (
            <>
              <label className="form-label">New Password:</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                placeholder="Enter new password here"
                onChange={handlePasswordChange}
              />

              <button
                className="btn btn-primary"
                onClick={handleChangePassword}
                disabled={isChangingPassword}
              >
                {isChangingPassword ? 'Changing Password...' : 'Change Password'}
              </button>
            </>
          )}
        </div>
        {isnotClicked && (
          <>
            <button onClick={handleDisplay}>
              {isClicked ? 'Hide Profile' : 'Wanna Change Password'}
            </button>
          </>
        )}
      </div>

      <div className="footer mt-3">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Welcome;
