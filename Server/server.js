import express from 'express';
import mongoose  from "mongoose";
import cors from 'cors';
import connectDB from '../config/db.js';
import dotenv from "dotenv";
import  authRoutes from './Routes/auth.js';
import { Route } from 'router';
import morgan from 'morgan';
import path from 'path';
import User from './Models/userModel.js';
import task from './Routes/taskRoutes.js'
import bcrypt from 'bcrypt';
import display from './Routes/display.js'
import userRoutes from './Routes/users.js';
dotenv.config({path: '../.env'});
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));   
// connectDB();

const mongoURI ='mongodb+srv://Struct:EIQJ7owXkHX8Jf3I@cluster0.cubv7tu.mongodb.net/structsurgen'
try{
        const conn = await mongoose.connect(mongoURI)
        console.log(`Connected To Mongodb struct surgen Database`)
    } catch (error) {
        console.log(`Error in MongoDB ${error}`)
}
app.use('/auth',authRoutes);
app.use('/api/task',task);
app.use('/display',display);
app.use('/api/users', userRoutes);
app.use('/tasks',task)
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

