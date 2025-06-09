import express from 'express';
import {
  test,
  updateUser,
  deleteUser,
  signout,
  getUsers,
  getUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router(); // 建立路由器

// 設定路由
router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getUsers', verifyToken, getUsers);
router.get('/check-session', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Session is active', userId: req.user.id });
});
router.get('/:userId', getUser);

export default router;
