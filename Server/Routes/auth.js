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
    const { employeeId } = req.body;

    // Generate a random 4-digit employee ID
    const generatedEmployeeId = Math.floor(1000 + Math.random() * 9000).toString();

    // Generate a random password (you may want a more secure method in production)
    const generatedPassword = Math.random().toString(36).substring(7);

    const user = new User({
      employeeId: generatedEmployeeId,
      password: generatedPassword,
    });

    await user.save();

    res.status(201).json({
      employeeId: generatedEmployeeId,
      password: generatedPassword,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    const user = await User.findOne({ employeeId });

    if (!user) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router
