import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    sNo: { type: Number },
    companyName: { type: String },
    consultant: { type: String },
    gidc: { type: String },
    type: { type: String },
    employ: { type: String },
    hp: { type: String },
    status: { type: String },
    priVisit: { type: Date },
    quotation: { type: Date },
    visit: { type: Date },
    drawing: { type: Date },
    documentsToBeUpload: [{ type: String }], // Array of file paths
    assignedTo: {type:String},
  },
  {
    timestamps: true,
  }
);


const task = mongoose.model('task', userSchema);

export default task;
