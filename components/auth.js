import Auth from "../models/auth.js";
import bcrypt from "bcrypt";

const addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await Auth.findOne({ email });

    if (user)
      return res.json({ success: false, msg: "Email is already registered" });
    else {
      bcrypt.hash(password, 10, async (err, encrypted) => {
        await Auth.create({ username, email, password: encrypted });
      });
      return res.json({ success: true });
    }
  } catch (e) {
    console.log(e);
  }
};

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, async (err, same) => {
        if (same) return res.json({ success: true });
        else return res.json({ success: false, msg: "Password is incorrect" });
      });
    } else return res.json({ success: false, msg: "User doesn't exists" });
  } catch (e) {
    console.log(e);
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await Auth.findOne({ email: req.body.email });
  } catch (e) {
    console.log(e);
  }
};

const findUser = async (req, res) => {
  try {
    const user = await Auth.findOne({ email: req.query.user });

    if (user)
      return res.json({
        success: true,
        user: { username: user.username, email: user.email },
      });
    else return res.json({ success: false });
  } catch (e) {
    console.log(e);
  }
};

export { addUser, getUser, logoutUser, findUser };
