import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import Auth from "../models/auth.js";
import { setUser } from "../service/auth.js";

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

    req.session.email = email;
    console.log(req.session.email);

    if (user) {
      bcrypt.compare(password, user.password, async (err, same) => {
        if (same) {
          await Auth.findOneAndUpdate({ email }, { loggedIn: true });

          const token = setUser(user);
          console.log(token);

          res.cookie("uid", token);
          return res.json({ success: true });
        } else
          return res.json({ success: false, msg: "Password is incorrect" });
      });
    } else return res.json({ success: false, msg: "User doesn't exists" });
  } catch (e) {
    console.log(e);
  }
};

const logoutUser = async (req, res) => {
  try {
    await Auth.findOneAndUpdate({ email: req.body.email }, { loggedIn: false });
  } catch (e) {
    console.log(e);
  }
};

const findUser = async (req, res) => {
  try {
    console.log("value of session is", req.session.email);
    const user = await Auth.findOne({ email: req.query.user });

    if (user)
      return res.json({
        success: true,
        user: {
          username: user.username,
          email: user.email,
          loggedIn: user.loggedIn,
        },
      });
    else return res.json({ success: false });
  } catch (e) {
    console.log(e);
  }
};

export { addUser, getUser, logoutUser, findUser };
