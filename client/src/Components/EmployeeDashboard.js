// client/src/Components/EmployeeDashboard.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const { employeeId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/display/tasks/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [employeeId]);

  return (
    <div className="employee-dashboard">
      <header className="employee-header">
        <h2>Welcome, Employee {employeeId}</h2>
        <p>Here are your assigned tasks:</p>
      </header>
      <section className="tasks-container">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task._id} className="task-card">
              <h3>{task.companyName}</h3>
              <p>{task.consultant}</p>
              <p>Status: {task.status}</p>
            </div>
          ))
        ) : (
          <p>No tasks assigned.</p>
        )}
      </section>
    </div>
  );
};

export default EmployeeDashboard;
