import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';

dotenv.config(); // 載入環境變數

mongoose // 連接到 MongoDB
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.log('MongoDB Error', err);
  });

const app = express(); // 建立 Express 應用程式
const port = 3000; // 設定應用程式埠號
app.use(express.json()); // 設置 Express 使用 JSON 格式的請求
app.use(cookieParser()); //  使用 cookie-parser 中間件處理 cookie

// 定義路由
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.listen(port, () => {
  console.log(` listening on port ${port}`);
});

// 錯誤處理中介軟體
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  res.status(statusCode).json({ success: false, statusCode, message });
});
