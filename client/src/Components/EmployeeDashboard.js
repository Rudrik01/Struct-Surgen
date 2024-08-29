import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const employeeId = localStorage.getItem('employeeId');
                const response = await axios.get(`http://localhost:5000/api/employee/tasks/${employeeId}`);
                setTasks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks', error);
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleTaskClick = (taskType) => {
        navigate(`/employee/tasks/${taskType}`);
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="logo">
                    <img src="/logo.png" alt="Company Logo" />
                </div>
                <div className="nav-buttons">
                    <button onClick={() => navigate('/employee/profile')}>Profile</button>
                    <button onClick={() => {
                        localStorage.clear();
                        navigate('/login');
                    }}>Logout</button>
                </div>
            </nav>
            <div className="content-wrapper">
                <div className="welcome-container">
                    <h1>Welcome to Your Dashboard</h1>
                    <p>Manage your tasks efficiently and stay on top of your assignments.</p>
                </div>
                {loading ? (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <p>Loading tasks...</p>
                    </div>
                ) : (
                    <div className="content-container">
                        {tasks.map(task => (
                            <div key={task.id} className="task-card" onClick={() => handleTaskClick(task.taskType)}>
                                <h3>{task.taskType}</h3>
                                <p>{task.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDashboard;
