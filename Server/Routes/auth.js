// server/routes/auth.routes.js
import  express  from 'express';
import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';
const router = express.Router();

//Testing the api
// router.get('/',(req,res)=>{
//   res.send("hello");
// });
// Register route

router.post('/register', async (req, res) => {
  try {
    const { employeeId,role} = req.body;

    // Check if required fields are present
    if (!employeeId) {
      // console.error(error);
      return res.status(400).json({ error: 'Employee ID is required' });
    }

    // Check if the user with the given employeeId already exists
    const existingUser = await User.findOne({ employeeId });
    if (existingUser) {
      return res.status(400).json({ error: 'Employee ID already registered' });
    }

    // Generate a password (you can customize this logic)
    // const generatedPassword = Math.random().toString(36).substring(7);
    const generatedPassword = Math.random().toString(36).substring(7);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(generatedPassword, salt);

    // Create a new user
    const newUser = new User({
      employeeId,
      password:hash,
      role
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({
      employeeId: savedUser.employeeId,
      password: savedUser.password,
      role: savedUser.role,
    });
  } catch (error) {
    console.error('Registration failed:', error);

    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }

    res.status(500).json({ error: error});
  }
});

export default router
