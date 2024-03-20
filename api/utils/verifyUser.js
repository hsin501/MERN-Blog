import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

/**
 * 驗證使用者的 JWT token
 * @param {Object} req - Express 的請求物件
 * @param {Object} res - Express 的回應物件
 * @param {Function} next - 下一個 middleware 函式
 * @returns {void}
 */

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, '未通過認證1'));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, '未通過認證2'));
    }
    req.user = user;
    next(); // 呼叫下一個 middleware 或是路由處理函式
  });
};
