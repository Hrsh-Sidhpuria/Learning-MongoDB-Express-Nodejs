import mongoose from "mongoose";

const userscheme = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    uppercase: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
});

const UserModel = mongoose.model("user", userscheme);

export default UserModel;
