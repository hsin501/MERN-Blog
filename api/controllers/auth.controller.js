import User from '../models/user.modle.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../../utils/error.js';
import jwt from 'jsonwebtoken';

//註冊
export const signup = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
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

  //hashpwd
  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json({ message: 'signup successfully 註冊成功' });
  } catch (err) {
    // console.log(err);
    // return res.status(500).json({ message: err.message });
    next(err);
  }
};

// 登入
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || password === '') {
    next(errorHandler(400, 'All fields are required 請填寫所有空格'));
  }
  try {
    const vaildUser = await User.findOne({ email });
    if (!vaildUser) {
      console.log('vaildUser');
      return next(errorHandler(404, 'User not found 找不到用戶'));
    }
    const validPassword = await bcryptjs.compare(password, vaildUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password 無效的密碼'));
    }
    const token = jwt.sign({ id: vaildUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = vaildUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
