
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashBoard.css';
import '../commom.css';


const DashBoard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch the list of users when the component mounts
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/dashboard');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserApproval = async (userId, currentApprovalStatus) => {
        try {
            // Toggle the approval status (0 to 1 or 1 to 0)
            const newApprovalStatus = currentApprovalStatus === 0 ? 1 : 0;

            // Make the API call to update the approval status
            await axios.post('http://localhost:5000/dashboard/approve', {
                userId,
                newApprovalStatus,
            });

            // Update the local state to reflect the changes
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, approved: newApprovalStatus } : user
                )
            );

            console.log('User approval/disapproval successful');
        } catch (error) {
            console.error('Error approving/disapproving user:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <h2>DashBoard</h2>
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Approved</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.approved ? 'Yes' : 'No'}</td>
                            <td className="dashboard-buttons">
                                <button
                                    className={`approve ${user.approved ? 'disapprove' : ''}`}
                                    onClick={() => handleUserApproval(user.id, user.approved)}
                                >
                                    {user.approved ? 'Disapprove' : 'Approve'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default DashBoard;
