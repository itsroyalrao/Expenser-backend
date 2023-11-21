import { config } from "dotenv";
config();

import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
};

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  } else return null;
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, valid) => {
      if (err) {
        return res.json({ success: false, msg: "Token is invalid" });
      } else {
        req.tokenPayload = valid;
        next();
      }
    });
  } else {
    return res.json({ success: false, msg: "Token is empty" });
  }
};

export { setUser, getUser, verifyToken };
