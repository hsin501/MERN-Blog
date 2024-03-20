import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import User from '../models/user.modle.js';

// 測試 API
export const test = (req, res) => {
  res.json({ msg: 'test api is working!!' });
};

// 更新使用者資料
export const updateUser = async (req, res, next) => {
  // console.log(req.user);
  // 檢查使用者權限
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, '無法更新此用戶'));
  }
  // 檢查並更新密碼
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, '密碼長度不能小於6'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  // 檢查並更新用戶名稱
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username > 20) {
      return next(errorHandler(400, '用戶名必須在7到20個字符之間'));
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, '用戶名不能包含空格'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, '用戶名只能包含字母和數字'));
    }
  }
  try {
    // 更新使用者資料並取得更新後的使用者
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      {
        new: true, // 返回更新後的使用者資料
      }
    );

    // 排除密碼欄位後回應更新後的使用者資料
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
