import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskSection.css';  // Add styling as needed

const TaskSection = ({ tasks }) => {
    const Navigate = useNavigate();

    const handleCardClick = (taskId) => {
        Navigate(`http://localhost:5000/task/${taskId}`);
    };

    return (
        <div className="task-section">
            {tasks.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                tasks.map(task => (
                    <div 
                        key={task._id} 
                        className="task-card" 
                        onClick={() => handleCardClick(task._id)}
                    >
                        <h3>{task.companyId.companyName}</h3>
                        <p>Task Type: {task.taskType}</p>
                        <p>Status: {task.status}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskSection;
