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

router.get("/login/success", (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.json({ success: true, user: req.user, cookies: req.cookies });
  }
});

router.get("/login/failed", (req, res) => {
  res.json({ success: false, msg: "Something went wrong" });
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("https://expenser-v1.netlify.app");
});

export default router;
