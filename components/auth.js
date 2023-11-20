const callbackGoogle = (req, res) => {
  res.redirect(
    `https://expenser-v1.netlify.app?user=${encodeURIComponent(
      JSON.stringify(req.user._json)
    )}`
  );
};

const logoutGoogle = (req, res) => {
  req.logOut();
  res.redirect("https://expenser-v1.netlify.app");
};

export { callbackGoogle, logoutGoogle };
