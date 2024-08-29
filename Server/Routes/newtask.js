  import express from 'express';
  import mongoose from 'mongoose';
  import Company from '../Models/company.js'; 
  import Task from '../Models/task.js'; 
  import User from '../Models/userModel.js'; 
  import nodemailer from 'nodemailer';
  import { verifyToken, isAdmin } from '../Middleware/authMiddleware.js'; // Import the middleware

  const router = express.Router();

  // Register a new company
  router.post('/company/register', async (req, res) => {
    const { companyName, address, contactPerson, contactEmail } = req.body;

    try {
      const existingCompany = await Company.findOne({ companyName });
      if (existingCompany) {
        return res.status(400).json({ message: 'Company already registered' });
      }

      const newCompany = new Company({ companyName, address, contactPerson, contactEmail });
      await newCompany.save();

      res.status(201).json(newCompany);
    } catch (error) {
      console.error('Error registering company:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Fetch newly registered companies with pending tasks
  router.get('/companies', async (req, res) => {
    try {
      const companiesWithPendingTasks = await Company.find().lean();
      const companyIdsWithTasks = await Task.distinct('companyId');
      
      const companiesWithoutTasks = companiesWithPendingTasks.filter(company => !companyIdsWithTasks.includes(company._id.toString()));
      
      res.status(200).json(companiesWithoutTasks);
    } catch (error) {
      console.error('Error fetching companies with pending tasks:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Assign a task to an employee
  router.post('/task/assign', async (req, res) => {
    const { companyId, taskType, assignedTo, deadline } = req.body;

    try {
      const existingTask = await Task.findOne({ companyId, taskType });
      if (existingTask) {
        return res.status(400).json({ message: 'Task already assigned for this company' });
      }

      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      const newTask = new Task({ companyId, taskType, assignedTo, deadline });
      await newTask.save();

      const employee = await User.findById(assignedTo);
      if (employee) {
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'patelrudrik1601@gmail.com',
            pass: 'fcsi rrvv wodx scqy',
          },
        });

        const mailOptions = {
          from: 'patelrudrik1601@gmail.com',
          to: employee.email,
          subject: 'New Task Assigned',
          html: `
          <div style="font-family: 'Lexend Deca', sans-serif; background-color: #f0fff0; padding: 20px; border-radius: 8px; color: #4a4a4a;">
            <h2 style="text-align: center; color: #ff4c4c;">New Task Assigned</h2>
            <p>Hello ${employee.name},</p>
            <p>You have been assigned a new task:</p>
            <ul style="list-style-type: none; padding: 0;">
              <li><strong>Task Type:</strong> ${taskType}</li>
              <li><strong>Company:</strong> ${company.companyName}</li>
              <li><strong>Deadline:</strong> ${deadline}</li>
            </ul>
            <p>Please ensure that the task is completed by the deadline.</p>
            <p style="text-align: center; margin-top: 20px;">
              <a href="#" style="text-decoration: none; background-color: #ff4c4c; color: white; padding: 10px 20px; border-radius: 8px; display: inline-block;">View Task</a>
            </p>
          </div>
        `,
        };

        await transporter.sendMail(mailOptions);
      }

      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error assigning task:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  export default router;
