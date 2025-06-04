import User from '../models/user.modle.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

//註冊功能
export const signup = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body; // 從請求中取得使用者名稱、電子郵件和密碼

  // 檢查必填欄位是否有缺漏
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    // return res.status(400).json({ message: 'All fields are required' });
    next(errorHandler(400, 'All fields are required 請填寫所有空格'));
  }

  //hashpwd 密碼加密
  const hashedPassword = await bcryptjs.hash(password, 10);

  // 創建新使用者
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save(); // 儲存新使用者到資料庫
    res.json({ message: 'signup successfully 註冊成功' });
  } catch (err) {
    // console.log(err);
    // return res.status(500).json({ message: err.message });
    next(err);
  }
};

// 登入功能
export const signin = async (req, res, next) => {
  const { email, password } = req.body; // 從請求中取得電子郵件和密碼

  // 檢查必填欄位是否有缺漏
  if (!email || !password || password === '') {
    next(errorHandler(400, 'All fields are required 請填寫所有空格'));
  }
  try {
    const vaildUser = await User.findOne({ email }); // 在資料庫中查找使用者
    if (!vaildUser) {
      // console.log('vaildUser');
      return next(errorHandler(404, 'User not found 找不到用戶'));
    }

    // 比較密碼是否正確
    const validPassword = await bcryptjs.compare(password, vaildUser.password);
    // 如果密碼不正確，回傳錯誤訊息
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password 無效的密碼'));
    }
    // 生成JWT令牌
    const token = jwt.sign(
      { id: vaildUser._id, isAdmin: vaildUser.isAdmin },
      process.env.JWT_SECRET
    );
    // 隱藏使用者的密碼，然後回傳使用者資料和JWT令牌
    const { password: pass, ...rest } = vaildUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      }) // 將JWT令牌設置在Cookie
      .json(rest); // 回傳使用者資料
  } catch (error) {
    next(error);
    console.log(error); // 回傳錯誤訊息
  }
};

// google oauth 登入認證功能，如果有帳號，就直接登入，如果沒有就註冊一個
export const google = async (req, res, next) => {
  console.log(req.body);
  const { email, name, googlePhotoUrl } = req.body; // 從請求中取得Google OAuth的使用者資料

  try {
    const user = await User.findOne({ email }); // 在資料庫中查找使用者

    // 如果找到使用者，則直接生成JWT令牌並回傳使用者資料
    if (user) {
      // console.log('找到現有用戶');
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      // 如果沒有找到使用者，則創建新使用者並生成JWT令牌，然後回傳使用者資料
      // console.log('新用戶');
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10); // 產生隨機密碼
      const newUser = new User({
        // 建立新使用者物件
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4), // 生成使用者名稱

        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save(); // 儲存新使用者
      // console.log(newUser);
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      ); // 產生 JWT token
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, { httpOnly: true }) // 設置 cookie
        .json(rest);
    }
  } catch (error) {
    // console.log(error);

    next(error);
  }
};
