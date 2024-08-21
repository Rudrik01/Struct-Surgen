
import express from 'express';
import task from '../Models/task.js';
import User from '../Models/userModel.js';
import crypto  from 'crypto'
const router = express.Router();
import session from 'express-session';

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Create a session middleware
router.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
  })
);
// Create a new task and assign it to an employee
router.post('/assign', async (req, res) => {
  const { companyName, assignedTo } = req.body;

  try {
    // Check if the assigned employee exists
    const employeeExists = await User.exists({ employeeId: assignedTo });

    if (!employeeExists) {
      return res.status(400).json({ message: 'Assigned employee does not exist' });
    }

    const newTask = new task({companyName, assignedTo });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Route to check status and documents uploaded by an employee
router.get('/checkStatusAndDocuments/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Find tasks assigned to the employee with the given employeeId
    const tasks = await task.find({ assignedTo: employeeId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for the employee' });
    }

    // Fetch user data for the selected employee
    const user = await User.findOne({ employeeId });

    // You can send back the list of tasks with all fields and user data to the frontend
    res.status(200).json({ tasks, user });
  } catch (error) {
    console.error('Error checking status and documents:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get task by company name
router.get('/task/company/:companyName', async (req, res) => {
  try {
    const task = await Task.findOne({ companyName: req.params.companyName });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update task by company name
router.put('/task/company/:companyName', async (req, res) => {
  try {
    // Exclude the assignedTo field from being updated
    const { assignedTo, ...updateData } = req.body;
    const task = await Task.findOneAndUpdate({ companyName: req.params.companyName }, updateData, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// ... (other routes)

export default router
