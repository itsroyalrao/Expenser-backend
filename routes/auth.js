import express from "express";

import {
  addUser,
  getUser,
  leaderboardDetails,
  logoutUser,
  resetPassword,
  changePassword,
} from "../controllers/auth.js";

const router = express.Router();

router.route("/signup").post(addUser);
router.route("/login").post(getUser);
router.route("/logout").get(logoutUser);
router.route("/leaderboard").get(leaderboardDetails);
router.route("/resetPassword").post(resetPassword);
router.route("/changePassword").post(changePassword);

export default router;
