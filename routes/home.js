import express from "express";

import { findUser, addExpense, totalExpense } from "../components/home.js";

const router = express.Router();

router.get("/", findUser);
router.post("/addExpense", addExpense);
router.get("/totalExpense", totalExpense);

export default router;
