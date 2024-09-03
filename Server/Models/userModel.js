import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String,unique:true,lowercase:true,required:true},
    name:{type:String,required:true},
    employeeId: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'employee'], default: 'employee' },
  },
  {
    timestamps: true,
  }
);
userSchema.index({ employeeId: 1 }, { unique: true });


const User = mongoose.model('User', userSchema);

export default User;
