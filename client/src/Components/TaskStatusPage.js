import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TaskStatusPage.css'; // Import a CSS file for styling

function TaskStatusPage() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedTaskType, setSelectedTaskType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of employees
    axios.get('http://localhost:5000/api/users')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleCheckTasks = () => {
    if (selectedEmployee && selectedTaskType) {
      // Find the selected employee's name from the employee list
      const employeeName = employees.find(emp => emp._id === selectedEmployee)?.name;
      navigate(`/company-cards/${selectedEmployee}/${selectedTaskType}/${employeeName}`);
    }
  };

  return (
    <div className="task-status-container">
      <div className="task-status-box">
        <img src="/logo.png" alt="Struct Surgen Logo" className="logo" /> {/* Add logo */}
        <h1 className="title">Check Task Status</h1>
        <p className="subtitle">Fill out the form below to check the status of tasks.</p>
        
        <div className="input-group">
          <label>Select Employee:</label>
          <select
            className="input-field"
            value={selectedEmployee}
            onChange={e => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Select Task Type:</label>
          <select
            className="input-field"
            value={selectedTaskType}
            onChange={e => setSelectedTaskType(e.target.value)}
          >
            <option value="">Select Task Type</option>
            <option value="Documents">Documents</option>
            <option value="Drawing">Drawing</option>
            <option value="License">License</option>
            <option value="Site Visit">Site Visit</option>
            <option value="Stability">Stability</option>
          </select>
        </div>

        <button className="check-tasks-button" onClick={handleCheckTasks}>Check Tasks</button>
      </div>
    </div>
  );
}

export default TaskStatusPage;
