import express from "express";

import { findUser, addExpense, allExpenses } from "../controllers/home.js";

const router = express.Router();

router.get("/", findUser);
router.post("/addExpense", addExpense);
router.get("/allExpenses", allExpenses);

export default router;
