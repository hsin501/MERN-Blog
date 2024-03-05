import User from '../models/user.modle.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../../utils/error.js';

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
    next(errorHandler(400, 'All fields are required'));
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
    res.json({ message: 'signup successfully' });
  } catch (err) {
    // console.log(err);
    // return res.status(500).json({ message: err.message });
    next(err);
  }
};
