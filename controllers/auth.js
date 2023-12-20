import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

import Auth from "../models/auth.js";

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
        if (same) {
          await Auth.findOneAndUpdate({ email }, { loggedIn: true });
          return res.json({ success: true });
        } else
          return res.json({ success: false, msg: "Password is incorrect" });
      });
    } else return res.json({ success: false, msg: "User doesn't exists" });
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

const logoutUser = async (req, res) => {
  try {
    await Auth.findOneAndUpdate(
      { email: req.query.email },
      { loggedIn: false }
    );
    res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

const leaderboardDetails = async (req, res) => {
  try {
    const users = await Auth.find().sort({ totalAmount: -1 });
    const lb = users.map((user) => {
      return { _id: user._id, email: user.email, total: user.totalAmount };
    });
    res.json({ success: true, lb });
  } catch (e) {
    console.log(e);
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email, 12);
  const user = await Auth.findOne({ email: email });

  if (user) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "iitsroyalrao@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
    });

    let message = {
      from: "iitsroyalrao@gmail.com",
      to: email,
      subject: "Reset Password Link",
      html: `<h4>Click <a href="https://expenser-v1.netlify.app/changePassword?email=${email}">Here</a> to change your password.</h4>`,
    };

    try {
      const info = await transporter.sendMail(message);
      if (info.accepted.length)
        return res.json({ success: true, msg: "Email is sent!" });
    } catch (e) {
      console.log(e);
      return res.json({ success: false, msg: "Error occured!" });
    }
  } else {
    return res.json({ success: false, msg: "User doesn't exists" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    bcrypt.hash(newPassword, 10, async (err, encrypted) => {
      if (err) console.log(err);

      await Auth.findOneAndUpdate({ email: email }, { password: encrypted });
      return res.json({ success: true, msg: "Password changed successfully!" });
    });
  } catch (e) {
    console.log(e.message);
  }
};

export {
  addUser,
  getUser,
  logoutUser,
  findUser,
  leaderboardDetails,
  resetPassword,
  changePassword,
};
