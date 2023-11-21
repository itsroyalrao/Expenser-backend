import express from "express";

import { findUser } from "../components/home.js";

const router = express.Router();

router.get("/", findUser);

export default router;
