import express from 'express'
import Task from '../Models/task.js'
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

// Get tasks with user information
router.get('/employee/:employeeId', async (req, res) => {
  const employeeId = req.params.employeeId;

  try {
    // Find tasks assigned to the specific employee and populate the 'assignedTo' field with user information
    const tasks = await Task.find({ assignedTo: employeeId }).populate('assignedTo', 'employeeId');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ... (other routes)

module.exports = router;
