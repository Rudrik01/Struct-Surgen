import express from 'express';
import Task from '../Models/task.js';
import User from '../Models/userModel.js';
import crypto from 'crypto';
import session from 'express-session';

const router = express.Router();

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Create a session middleware
router.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

// Route to assign a new task with subtasks to an employee
router.post('/assign', async (req, res) => {
  const { companyName, assignedTo, mainTask, subtasks } = req.body;

  try {
    // Check if the assigned employee exists
    const employeeExists = await User.exists({ employeeId: assignedTo });

    if (!employeeExists) {
      return res.status(400).json({ message: 'Assigned employee does not exist' });
    }

    // Create the new task with subtasks
    const newTask = new Task({
      companyName,
      assignedTo,
      mainTask,
      subtasks,
      currentSubtask: subtasks[0]?.name,  // Set the first subtask as the current one
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Route to update a subtask's status and formData
router.put('/task/:taskId/subtask/:subtaskId', async (req, res) => {
  const { taskId, subtaskId } = req.params;
  const { formData, status } = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Find the subtask to update
    const subtask = task.subtasks.id(subtaskId);

    if (!subtask) {
      return res.status(404).json({ message: 'Subtask not found' });
    }

    // Update the subtask's formData and status
    subtask.formData = formData;
    subtask.status = status;
    if (status === 'completed') {
      subtask.completedAt = new Date();

      // Move to the next subtask if available
      const nextSubtaskIndex = task.subtasks.findIndex(st => st._id.toString() === subtaskId) + 1;
      if (nextSubtaskIndex < task.subtasks.length) {
        task.currentSubtask = task.subtasks[nextSubtaskIndex].name;
      } else {
        task.currentSubtask = null;  // All subtasks are completed
      }
    }

    await task.save();

    res.status(200).json({ message: 'Subtask updated successfully', task });
  } catch (error) {
    console.error('Error updating subtask:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Additional routes can be added here for further functionalities

export default router;
