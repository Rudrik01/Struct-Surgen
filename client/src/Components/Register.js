// client/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [role, setRole] = useState('employee'); // Default to 'employee'
  const [registrationData, setRegistrationData] = useState(null);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        employeeId,
        role,
      });
      
  
      if (response && response.data) {
        // Check if response and response.data are defined
        setRegistrationData(response.data);
        setError(null);
      } else {
        setError("Invalid response from the server");
      }
    } catch (error) {
      setRegistrationData(null);
      setError(error.response?.data?.error || error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <label>
        Employee ID:
        <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
      </label>
      <br />
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <br />
      <button onClick={handleRegister}>Register</button>

      {registrationData && (
        <div>
          <p>Registration successful!</p>
          <p>Employee ID: {registrationData.employeeId}</p>
          <p>Password: {registrationData.password}</p>
          <p>Role: {registrationData.role}</p>
        </div>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Register;
