import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'Customer',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    expireToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model('user', UserSchema);

export default User;
