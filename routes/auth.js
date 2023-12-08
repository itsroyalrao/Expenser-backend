import express from "express";

import {
  addUser,
  getUser,
  logoutUser,
  leaderboardDetails,
} from "../controllers/auth.js";

const router = express.Router();

router.route("/signup").post(addUser);
router.route("/login").post(getUser);
router.route("/logout").get(logoutUser);
// router.route("/allExpenses").get(logoutUser);
router.route("/leaderboard").get(leaderboardDetails);

export default router;
