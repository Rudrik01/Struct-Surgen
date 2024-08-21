// client/src/Components/ChangePassword.js
import React, { useState } from 'react';
import axios from 'axios';
import './ChangePassword.css';

const ChangePassword = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
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
      setMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="change-password">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ChangePassword;
