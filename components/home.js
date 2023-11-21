import Auth from "../models/auth.js";

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

export { findUser };
