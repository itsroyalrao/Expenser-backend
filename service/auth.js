import jwt from "jsonwebtoken";
const secret = "$mohit$rao$";

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
  if (token) return jwt.verify(token, secret);
  else return null;
};

export { setUser, getUser };
