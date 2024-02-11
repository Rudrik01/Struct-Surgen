import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    employeeId: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'employee'], default: 'employee' },
  },
  {
    timestamps: true,
  }
);
userSchema.index({ employeeId: 1 }, { unique: true });

// userSchema.pre('save', async function (next) {
//   const user = this;

//   // Generate a password if it's not provided
//   if (!user.password) {
//     const generatedPassword = Math.random().toString(36).substring(7);
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(generatedPassword, salt);
//     user.password = hash;
//   }

//   next();
// });

const User = mongoose.model('User', userSchema);

export default User;
