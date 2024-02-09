import express from 'express';
import mongoose  from "mongoose";
import cors from 'cors';
import connectDB from '../config/db.js';
import dotenv from "dotenv";
import  authRoutes from './Routes/auth.js';
import { Route } from 'router';
import morgan from 'morgan';
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(morgan('dev'))
app.use('/api/v1/auth',authRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(express.json());