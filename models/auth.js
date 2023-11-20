import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pictureURI: {
    type: String,
    required: true,
  },
  loggedIn: {
    type: String,
    default: true,
  },
});

export default mongoose.model("auth", userSchema);
