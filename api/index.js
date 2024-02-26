import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';

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

// 定義路由
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(` listening on port ${port}`);
});
