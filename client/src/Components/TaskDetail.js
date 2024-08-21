// client/src/Components/TaskDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TaskDetail.css';

const TaskDetail = () => {
  const { companyName } = useParams();
  const [task, setTask] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/task/company/${companyName}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [companyName]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/task/company/${companyName}`, task, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating task:', error);
      setMessage('Error updating task');
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <div className="task-detail">
      {task ? (
        <form onSubmit={handleUpdate}>
          <h2>Task Detail for {task.companyName}</h2>
          <div>
            <label>Consultant:</label>
            <input type="text" name="consultant" value={task.consultant || ''} onChange={handleChange} />
          </div>
          <div>
            <label>GIDC:</label>
            <input type="text" name="gidc" value={task.gidc || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Type:</label>
            <input type="text" name="type" value={task.type || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Employ:</label>
            <input type="text" name="employ" value={task.employ || ''} onChange={handleChange} />
          </div>
          <div>
            <label>HP:</label>
            <input type="text" name="hp" value={task.hp || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Status:</label>
            <input type="text" name="status" value={task.status || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Pri Visit:</label>
            <input type="date" name="priVisit" value={task.priVisit ? task.priVisit.substring(0, 10) : ''} onChange={handleChange} />
          </div>
          <div>
            <label>Quotation:</label>
            <input type="date" name="quotation" value={task.quotation ? task.quotation.substring(0, 10) : ''} onChange={handleChange} />
          </div>
          <div>
            <label>Visit:</label>
            <input type="date" name="visit" value={task.visit ? task.visit.substring(0, 10) : ''} onChange={handleChange} />
          </div>
          <div>
            <label>Drawing:</label>
            <input type="date" name="drawing" value={task.drawing ? task.drawing.substring(0, 10) : ''} onChange={handleChange} />
          </div>
          <div>
            <label>Documents to be Uploaded:</label>
            <input type="text" name="documentsToBeUpload" value={task.documentsToBeUpload || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Assigned To:</label>
            <input type="text" name="assignedTo" value={task.assignedTo || ''} readOnly />
          </div>
          <button type="submit">Update Task</button>
          {message && <p>{message}</p>}
        </form>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
};

export default TaskDetail;
