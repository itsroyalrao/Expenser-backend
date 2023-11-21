import express from "express";

import { addUser, getUser } from "../components/auth.js";

const router = express.Router();

router.route("/signup").post(addUser);
router.route("/login").post(getUser);

export default router;
