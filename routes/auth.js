import express from "express";
import { addUser, findUser, getUser, logoutUser } from "../components/auth.js";

const router = express.Router();

router.route("/").get(findUser);
router.route("/signup").post(addUser);
router.route("/login").post(getUser);
router.route("/logout").post(logoutUser);

export default router;
