// server/routes/auth.routes.js
import  express  from 'express';
import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import axios from 'axios';
import nodemailer from 'nodemailer';
import session from 'express-session';
import crypto from 'crypto'

import jwt from 'jsonwebtoken';
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



// //Login
// router.post('/login', async (req, res) => {
//   try {
//     const { employeeId, password } = req.body;

//     // Check if the user is attempting admin login
//     if (employeeId === 'admin') {
//       // Query the database for the admin user
//       const adminUser = await User.findOne({ employeeId: 'admin' });

//       // Check if the admin user exists
//       if (!adminUser) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }

//       // Check if the provided password matches the stored hashed password for the admin
//       const isPasswordValid = await bcrypt.compare(password, adminUser.password);

//       if (!isPasswordValid) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }

//       // Add logic to redirect to the admin panel (replace '/admin-panel' with your actual admin panel route)
      
//       return res.status(200).json({ message: 'Admin login successful', user: adminUser });
//     }

//     // Check if the user exists
//     const user = await User.findOne({ employeeId });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Check if the provided password matches the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     // Respond with a success message or user data
//     console.log(user);
//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret key

router.post('/login', async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    let user;

    // Check if the user is attempting admin login
    if (employeeId === 'admin') {
      user = await User.findOne({ employeeId: 'admin' });
    } else {
      user = await User.findOne({ employeeId });
    }

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/verifyToken', async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    res.status(200).json({ message: 'Token is valid', decoded });
  });
});

// Change Password
router.post('/changePassword', async (req, res) => {
  try {
    const { employeeId, oldPassword, newPassword, email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ employeeId });

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
      html: `
         <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #dddddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:logo" alt="Company Logo" style="width: 150px;"/>
          </div>
          <h2 style="color: #333;">Hello ${user.name},</h2>
          <p style="font-size: 16px; color: #555;">Your password has been successfully changed.</p>
          <p style="font-size: 16px; color: #555;">If you did not initiate this change, please contact our support team immediately.</p>
          <p style="font-size: 16px; color: #555;">Best regards,<br>Your Company Name</p>
          <div style="margin-top: 20px; text-align: center;">
            <a href="http://yourcompany.com/support" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Contact Support</a>
          </div>
          <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
            <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </footer>
        </div>
      ` 
      // attachments: [{
      //   filename: 'logo.png',
      //   path: 'path/to/logo.png',
      //   cid: 'logo' // Same cid value as in the html img src
      // }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Password changed successfully. Check your email for confirmation.' });
      }
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router
