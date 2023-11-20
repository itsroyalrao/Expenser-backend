import express from "express";
import passport from "passport";
import { callbackGoogle, logoutGoogle } from "../components/auth.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  callbackGoogle
);

router.get("/logout", logoutGoogle);

router.get("/session", (req, res) => {
  const user = req.session.user;
  console.log(user);
  res.json(user);
});

export default router;
