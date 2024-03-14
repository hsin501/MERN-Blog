import mongoose from 'mongoose';

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
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
