import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDashboard = ({ employeeId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/display`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  });

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.companyName}</li>
          // Adjust this based on your task model structure
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDashboard;
