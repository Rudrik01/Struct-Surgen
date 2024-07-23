import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      // Make a POST request to your backend endpoint for changing password
      const response = await axios.post('http://localhost:5000/auth/changePassword', {
        employeeId,
        oldPassword,
        newPassword,
      });

      // Handle the success response
      setMessage(response.data.message);
    } catch (error) {
      // Handle errors, e.g., invalid credentials or server error
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <div>
        <label>Employee ID:</label>
        <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required />
      </div>
      <div>
        <label>Old Password:</label>
        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
      </div>
      <div>
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
      </div>
      <button onClick={handleChangePassword}>Change Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
