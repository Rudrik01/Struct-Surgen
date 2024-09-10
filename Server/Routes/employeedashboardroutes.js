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

router.put('/ta/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { formData, completed } = req.body;
  console.log(taskId);
  console.log(formData);

  // Input Validation
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: 'Invalid Task ID' });
  }

  try {
    // Find the task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update formData if provided
    if (formData) {
      // Optionally, validate formData structure here
      task.formData = formData;
      console.log(task.formData)
    }

    // Update status if 'completed' flag is provided
    if (typeof completed === 'boolean') {
      task.status = completed ? 'Completed' : 'Pending';
    }

    // Save the task
    await task.save();

    // If task is marked as completed, update the Company's tasksCompleted map
    if (completed) {
      const company = await Company.findById(task.companyId);
      if (!company) {
        return res.status(404).json({ message: 'Associated Company not found' });
      }

      // Update the tasksCompleted map
      company.tasksCompleted.set(task.taskType, true);
      await company.save();
    }

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
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

// GET companies that assigned a specific task type to the employee
router.get('/tasks/:employeeid/:taskType/companies', async (req, res) => {
  const { employeeid, taskType } = req.params;

  try {
    const user = await User.findOne({ employeeId: employeeid });
    const tasks = await Task.find({ assignedTo: user._id, taskType })
      .populate('companyId', 'srNo companyName')
      .exec();

    const companies = tasks.map(task => task.companyId);
    res.status(200).json({companies,tasks});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching companies', error });
  }
});


export default router;
