// AdminForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleCreateAdmin = async () => {
    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post('http://localhost:5000/auth/addAdmin', {
        employeeId,
        password,
        email,
        name,
      });

      console.log(response.data);
      // Optionally, you can display a success message or redirect the user
    } catch (error) {
      console.error('Error creating admin:', error);
      // Handle error, display an error message, etc.
    }
  };

  return (
    <div>
      <h2>Create Admin</h2>
      <div>
        <label>Employee ID:</label>
        <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <button onClick={handleCreateAdmin}>Create Admin</button>
    </div>
  );
};

export default AdminForm;