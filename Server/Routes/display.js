// routes/task.js
import express from 'express';
import Task from '../Models/task.js';
import authMiddleware from './auth.js';
import session from 'express-session';
import crypto from 'crypto';

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
router.get('/tasks/:employeeId', authMiddleware, async (req, res) => {
  try {
    const { employeeId } = req.params;
    const tasks = await Task.find({ assignedTo: employeeId });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
