import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './taskal.css';

const TaskAllocation = () => {
  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [taskType, setTaskType] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:5000/api/new/companies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));

    axios.get('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      navigate('/adminHome');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleAssignTask = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    axios.post('http://localhost:5000/api/new/task/assign', {
      companyId: selectedCompany,
      taskType,
      assignedTo,
      deadline
    }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      console.log('Task assigned:', response.data);
      alert('Task assigned successfully');
      navigate('/adminHome'); // Navigate to admin home page after successful task assignment
    })
    .catch(error => console.error('Error assigning task:', error));
  };

  return (
    <div className="task-allocation-container">
      <div className="task-allocation-logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="task-allocation-header">
        <h2>Assign a Task</h2>
        <p>Fill out the form below to allocate tasks to employees.</p>
      </div>
      <form onSubmit={handleAssignTask} className="task-allocation-form">
        <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} required>
          <option value="">Select Company</option>
          {companies.map(company => (
            <option key={company._id} value={company._id}>{company.companyName}</option>
          ))}
        </select>

        <select value={taskType} onChange={(e) => setTaskType(e.target.value)} required>
          <option value="">Select Task</option>
          <option value="Documents">Documents</option>
          <option value="Drawing">Drawing</option>
          <option value="License">License</option>
          <option value="Site Visit">Site Visit</option>
          <option value="Stability">Stability</option>
        </select>

        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
          <option value="">Assign To</option>
          {employees.map(employee => (
            <option key={employee._id} value={employee._id}>{employee.name}</option>
          ))}
        </select>

        <input id="dt" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />

        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
};

export default TaskAllocation;
