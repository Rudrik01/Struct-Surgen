import express from 'express';
import mongoose from 'mongoose';
import Task from '../Models/task.js';  // Adjust the path as needed
import Company from '../Models/company.js';  // Adjust the path as needed
import User from '../Models/userModel.js';  // Adjust the path as needed

const router = express.Router();

// Middleware to check if the user is authenticated (assuming you have a similar function)
// function isAuthenticated(req, res, next) {
//   // Add your authentication logic here
//   // If the user is authenticated, call next()
//   // Otherwise, return res.status(401).json({ message: 'Unauthorized' });
//   next(); // Remove this line and implement authentication
// }

// GET all tasks assigned to a specific employee
// GET all tasks assigned to a specific employee
router.get('/tasks/:employeeid', async (req, res) => {
  const { employeeid } = req.params;  // Use 'employeeid' to match the route parameter

  try {
    console.log(employeeid);
    const user = await User.findOne({ employeeId: employeeid });  // Use 'employeeid' to query the database
    console.log(user);

    const tasks = await Task.find({ assignedTo: user._id })
      .populate('companyId', 'companyName') // Only populate companyName
      .exec();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});


// GET details of a specific task for an employee
router.get('/task/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId)
      .populate('companyId', 'companyName address contactPerson contactEmail')
      .exec();

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task details', error });
  }
});

// PUT to update the task status or save form data
router.put('/task/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { formData, completed } = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (formData) {
      task.formData = formData;
    }

    if (completed) {
      task.status = 'Completed';
      
      // Update the tasksCompleted map in the Company model
      const company = await Company.findById(task.companyId);
      company.tasksCompleted.set(task.taskType, true);
      await company.save();
    }

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

// GET employee profile
router.get('/profile/:employeeId', async (req, res) => {
  const { employeeId } = req.params; // Assuming the authenticated user's ID is stored in req.user

  try {
    const employee = await User.findOne({employeeId:employeeId})
      .select('-password -__v') // Exclude sensitive fields
      .exec();

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching employee profile', error });
  }
});

export default router;
