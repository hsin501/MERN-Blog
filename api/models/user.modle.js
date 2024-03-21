import mongoose from 'mongoose';

// 使用 Mongoose 建立使用者模型
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // 自動加入時間戳記
);

// 建立 User 模型
const User = mongoose.model('User', userSchema);

export default User;
