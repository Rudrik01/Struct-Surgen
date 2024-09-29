import express from 'express';
import mongoose from 'mongoose';
import Task from '../Models/task.js';  // Adjust the path as needed
import Company from '../Models/company.js';  // Adjust the path as needed
import User from '../Models/userModel.js';  // Adjust the path as needed
const router = express.Router();
// GET /api/admin/tasks/:employeeId?taskType=<taskType>
// Fetch tasks assigned to a specific employee with an optional taskType filter
router.get('/tasks/:employeeId', async (req, res) => {
  const { employeeId } = req.params;
  const { taskType } = req.query;

  try {
    const filter = { assignedTo: employeeId };
    
    // Apply taskType filter if it is provided
    if (taskType) {
      filter.taskType = taskType;
    }

    // Find tasks based on the employeeId and taskType, populate company details
    const tasks = await Task.find(filter).populate('companyId');
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// GET /api/admin/task/:taskId
// Fetch task details by taskId
router.get('/task/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    // Find task by taskId
    const task = await Task.findById(taskId);
    
    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task details:', error);
    res.status(500).json({ message: 'Error fetching task details' });
  }
});



export default router;
