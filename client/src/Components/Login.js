// client/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/auth/login', {
        employeeId,
        password,
      });

      console.log(response.data.message); // Handle success
    } catch (error) {
      console.error('Login failed:', error.response.data.error); // Handle error
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Employee ID:
        <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
