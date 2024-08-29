import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './TaskForm.css';  // Add styling as needed

const TaskForm = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/task/${taskId}`);
                setTask(response.data);
                setFormData(response.data.formData || {});
            } catch (error) {
                console.error('Error fetching task', error);
            }
        };

        fetchTask();
    }, [taskId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.put(`/api/employee/task/${taskId}`, { formData });
            Navigate('/dashboard');  // Redirect to dashboard after saving
        } catch (error) {
            console.error('Error submitting task', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);

        try {
            await axios.put(`/api/employee/task/${taskId}`, { formData, completed: true });
            Navigate.push('/dashboard');  // Redirect to dashboard after final submit
        } catch (error) {
            console.error('Error completing task', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!task) return <p>Loading...</p>;

    return (
        <div className="task-form-container">
            <h2>Task for {task.companyId.companyName}</h2>
            <form onSubmit={handleSubmit}>
                {/* Render form fields dynamically based on task type */}
                <div className="form-group">
                    <label htmlFor="field1">Field 1</label>
                    <input 
                        type="text" 
                        name="field1" 
                        value={formData.field1 || ''} 
                        onChange={handleChange} 
                    />
                </div>
                {/* Add more fields as needed */}

                <button type="submit" disabled={isSubmitting}>Save Progress</button>
                <button type="button" onClick={handleFinalSubmit} disabled={isSubmitting}>Final Submit</button>
            </form>
        </div>
    );
};

export default TaskForm;
