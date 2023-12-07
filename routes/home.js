import express from "express";

import { addExpense, allExpenses } from "../controllers/home.js";
import { findUser } from "../controllers/auth.js";

const router = express.Router();

router.get("/", findUser);
router.post("/addExpense", addExpense);
router.get("/allExpenses", allExpenses);

export default router;
