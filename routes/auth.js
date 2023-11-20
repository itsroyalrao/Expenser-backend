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

router.get("/session", logoutGoogle);

export default router;
