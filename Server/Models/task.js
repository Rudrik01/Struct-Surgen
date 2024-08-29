import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  taskType: { type: String, enum: ['Documents', 'Drawing', 'License', 'Site Visit', 'Stability'], required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  formData: { type: Schema.Types.Mixed }, // Dynamic fields for each task
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
