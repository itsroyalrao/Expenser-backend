import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
  loggedIn: {
    type: Boolean,
    default: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("auth", userSchema);
