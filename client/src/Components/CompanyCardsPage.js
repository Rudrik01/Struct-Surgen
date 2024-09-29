import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CompanyCardsPage.css'; // Assuming this is your CSS file for this page

function CompanyCardsPage() {
  const { employeeId, taskType, employeeName } = useParams();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tasks for the selected employee and task type
    axios.get(`http://localhost:5000/api/admin/tasks/${employeeId}?taskType=${taskType}`)
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, [employeeId, taskType]);

  const handleCardClick = (taskId,taskStatus) => {
    if(taskStatus==='Completed'){
      navigate(`/form-status/${taskId}`);
    }
    else{
      alert('Task is Not completed');
    }
  };

  return (
    <div className="company-cards-page">
      <h1 className="page-title">
        Companies with <span className="task-type">{taskType}</span> Tasks assigned to <span className="employee-name">{employeeName}</span>
      </h1>
      {tasks.length > 0 ? (
        <div className="cards-container">
          {tasks.map(task => (
            <div key={task._id} className="company-card" onClick={() => handleCardClick(task._id,task.status)}>
              <h3 className="company-name">{task.companyId.companyName}</h3>
              <p className={`task-status ${task.status.toLowerCase() === 'completed' ? 'completed' : ''}`}>
                Task Status: <span>{task.status}</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-tasks">No tasks found for this employee and task type.</p>
      )}
    </div>
  );
}

export default CompanyCardsPage;
