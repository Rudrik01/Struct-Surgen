import express from 'express';
import Task from '../Models/task.js';
import authMiddleware from './auth.js';
import User from '../Models/userModel.js';
import session from 'express-session';
import crypto  from 'crypto'

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Create a session middleware

const router = express.Router();
router.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
  })
);
// API endpoint to get tasks for a specific employee
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    // Assuming you have the user object attached to the request by the auth middleware
    const { user } = req;

    // Check if the user object and _id property exist
    if (!user || !user._id) {
      return res.status(404).json({ error: 'User not found or missing user ID' });
    }

    const tasks = await Task.find({ employeeId: user._id });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
