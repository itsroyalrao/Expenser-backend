import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect(
      `https://expenser-v1.netlify.app?user=${encodeURIComponent(
        JSON.stringify(req.user._json)
      )}`
    );
  }
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("https://expenser-v1.netlify.app");
});

router.get("/session", (req, res) => {
  const user = req.session.user;
  console.log(user);
  res.json(user);
});

export default router;
