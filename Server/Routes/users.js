
import express from 'express';
import User from '../Models/userModel.js';
const router = express.Router();
import session from 'express-session';
import crypto  from 'crypto'
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
// Get the list of all employees
router.get('/', async (req, res) => {
  try {
      // Exclude users with role 'admin'
      const employees = await User.find({ role: { $ne: 'admin' } }, 'employeeId name');
      res.json(employees);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


export default router;
