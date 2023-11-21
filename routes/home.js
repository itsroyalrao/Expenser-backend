import express from "express";

import { findUser } from "../components/home.js";
import { verifyToken } from "../service/auth.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", findUser);

export default router;
