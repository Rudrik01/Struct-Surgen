// models/Company.js
import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema } = mongoose;

// Initialize auto-increment
const AutoIncrement = AutoIncrementFactory(mongoose);

// Define the company schema
const companySchema = new Schema({
  srNo: { type: Number }, // Auto-incremented field
  companyName: { type: String, required: true, unique: true },
  address: { type: String },
  contactPerson: { type: String },
  contactEmail: { type: String },
  tasksCompleted: {
    type: Map,
    of: Boolean,
    default: new Map([
      ['Documents', false],
      ['Drawing', false],
      ['License', false],
      ['Site Visit', false],
      ['Stability', false],
    ]),
  }, // Track which tasks are completed
}, {
  timestamps: true,
});

// Apply auto-increment to `srNo` field
companySchema.plugin(AutoIncrement, { inc_field: 'srNo' });

// Create the Company model
const Company = mongoose.model('Company', companySchema);

export default Company;
