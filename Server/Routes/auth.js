// server/routes/auth.routes.js
import  express  from 'express';
import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import axios from 'axios';
import nodemailer from 'nodemailer';
import session from 'express-session';
import crypto from 'crypto'
const router = express.Router();


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

//Testing the api
// router.get('/',(req,res)=>{
//   res.send("hello");
// });


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'patelrudrik1601@gmail.com',
    pass: 'fcsi rrvv wodx scqy',
  },
});

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(36).slice(-4);
};


//add admin
router.post('/addAdmin', async (req, res) => {
  const{employeeId,password,email,name} = req.body;
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ employeeId: 'admin' });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    // Encrypt the password using bcrypt
    const hashedAdminPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const adminUser = new User({
      employeeId: 'admin',
      password: hashedAdminPassword,
      email:email,
      name:name,
      role: 'admin', // You can set the role to 'admin' or any other value that represents admin
    });

    // Save the admin user to the database
    await adminUser.save();

    // Respond with the created admin user data
    res.status(201).json({ message: 'Admin user created successfully.', adminUser });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
//Create Employee 
const generateUniqueUsername = async () => {
  while (true) {
    const newUsername = Math.floor(1000 + Math.random() * 9000);
    const existingUser = await User.findOne({ employeeId: newUsername });

    if (!existingUser) {
      return newUsername;
    }
  }
};

router.post('/createEmployee', async (req, res) => {
  try {
    const { email, name, role } = req.body;
    const existingUser = await User.findOne({ email:email });
    if (existingUser) {
      // Email is already in use, redirect to admin create employee page with alert
      return res.status(400).json({ message: 'Email is already in use.'});
    }
    

    // Generate a unique 4-digit username
    const employeeId = await generateUniqueUsername();

    // Generate a random password
    const password = Math.random().toString(36).slice(-8);

    // Encrypt the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user with email, username, and hashed password
    const newUser = new User({ email,name,employeeId, password: hashedPassword, role });
    await newUser.save();

    // Uncomment the following line to log the data being stored in the database
     console.log('Employee data stored:', newUser,password);

    // Commenting out the email sending logic for testing

    const mailOptions = {
      from: 'patelrudrik1601@gmail.com',
      to: email,
      subject: 'Employee ID and Password',
      text: `Your Employee ID is: ${newUser.employeeId}\nYour Password is: ${password}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(201).json({ message: 'Employee created successfully. Check your email for login details.' });
      }
    });

    // Respond with the created employee data for testing
      // Respond with the created employee data for testing
      res.status(201).json({ message: 'Employee created successfully.', employee: newUser });
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });



//Login
router.post('/login', async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    // Check if the user is attempting admin login
    if (employeeId === 'admin') {
      // Query the database for the admin user
      const adminUser = await User.findOne({ employeeId: 'admin' });

      // Check if the admin user exists
      if (!adminUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if the provided password matches the stored hashed password for the admin
      const isPasswordValid = await bcrypt.compare(password, adminUser.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Add logic to redirect to the admin panel (replace '/admin-panel' with your actual admin panel route)
      
      return res.status(200).json({ message: 'Admin login successful', user: adminUser });
    }

    // Check if the user exists
    const user = await User.findOne({ employeeId });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Respond with a success message or user data
    console.log(user);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Change Password
router.post('/changePassword', async (req, res) => {
  try {
    const { email,employeeId, oldPassword, newPassword } = req.body;

    // Check if the user exists
    const user = await User.findOne({ employeeId,email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided old password matches the stored hashed password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordValid) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    // Encrypt the new password using bcrypt
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedNewPassword;
    await user.save();
    
    const mailOptions = {
      from: 'patelrudrik1601@gmail.com',
      to: user.email,
      subject: 'Password Reset Successfully',
      text: `Your Password has been successfully `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(201).json({ message: 'Employee created successfully. Check your email for login details.' });
      }
    });
    // Respond with a success message
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


export default router
