import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import React, { useState } from 'react';
import axios from 'axios';
import "./CreateEmployee.css";

const EmployeeForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleCreateEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/createEmployee', {
        email,
        name,
        role,
      });
  
      console.log(response.data);
  
      if (response.status === 400) {
        alert(response.data.message);
      } else {
        alert('Employee created successfully!');
        // Redirect to the desired page or clear the form, etc.
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Error creating employee. Please try again.');
    }
  };

  return (
    <div className="create-employee">
      <section className="main-container">
        <div className="content-area">
          <div className="form-container">
            <img
              className="whatsapp-image-2024-03-05-at-3-icon"
              loading="lazy"
              alt=""
              src="/logo.png"
            />
          </div>
          <div className="rectangle-parent">
            <div className="frame-child" />
            <div className="button-primary">
              <div className="create-employee1">Create Employee</div>
            </div>
            <div className="field-labels">
              <div className="email">Email</div>
              <input
                className="input-fields"
                placeholder="Enter Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field-labels">
              <div className="email">Name</div>
              <input
                className="input-fields"
                placeholder="Enter Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="field-labels2">
              <div className="role">Role</div>
              <FormControl variant="outlined" className="parent">
                <InputLabel id="role-label">Select Role</InputLabel>
                <Select
                  labelId="role-label"
                  label="Select Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
                </Select>
                <FormHelperText>Choose the role for the employee</FormHelperText>
              </FormControl>
            </div>
            <div className="button-secondary">
              <button className="create-employee2 cart button-secondary" onClick={handleCreateEmployee}>
                Create Employee
              </button>
            </div>
          </div>
        </div>
      </section>
      <img className="vectors-icon" alt="" src="/vectors.svg" />
    </div>
  );
};

export default EmployeeForm;
