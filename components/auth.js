import Auth from "../models/auth.js";

const callbackGoogle = async (req, res) => {
  const user = req.user._json;

  const response = await Auth.findOne({ id: user.sub });

  if (response) {
    await Auth.findOneAndUpdate({ id: response.id }, { loggedIn: true });
  } else {
    await Auth.create({
      id: user.sub,
      name: user.name,
      email: user.email,
      pictureURI: user.picture,
    });
  }

  res.redirect(
    `https://expenser-v1.netlify.app?user=${encodeURIComponent(
      JSON.stringify(req.user._json)
    )}`
  );
};

const logoutGoogle = async (req, res) => {
  if (req.query.userID) {
    await Auth.findOneAndUpdate({ id: req.query.userID }, { loggedIn: false });

    req.logOut();
    res.redirect("https://expenser-v1.netlify.app");
  }
};

const session = async (req, res) => {
  const user = await Auth.findOne({ id: req.body.userID });
  if (user) return res.json({ success: true });
  else return res.json({ success: false });
};

export { callbackGoogle, logoutGoogle, session };
