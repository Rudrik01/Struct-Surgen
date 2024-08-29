import mongoose from 'mongoose';

const { Schema } = mongoose;

const companySchema = new Schema({
  companyName: { type: String, required: true, unique: true },
  address: { type: String },
  contactPerson: { type: String },
  contactEmail: { type: String },
  tasksCompleted: { type: Map, of: Boolean }, // Track which tasks are completed
}, {
  timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

export default Company;
