import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.log('MongoDB Error', err);
  });

const app = express();
const port = 3000;
app.use(express.json());

// 定義路由
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(` listening on port ${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  res.status(statusCode).json({ success: false, statusCode, message });
});
