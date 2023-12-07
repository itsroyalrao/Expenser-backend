import express from "express";
import { getPaymentID, createPayment } from "../controllers/payments.js";

const router = express.Router();

router.route("/").get(getPaymentID).post(createPayment);
// router.route("/leaderboard").get(paymentController.getLeaderboard);

export default router;
