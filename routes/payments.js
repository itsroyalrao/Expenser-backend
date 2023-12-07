import express from "express";
import {
  getPaymentID,
  createPayment,
  getPremiumStatus,
} from "../controllers/payments.js";

const router = express.Router();

router.route("/").get(getPaymentID).post(createPayment);
router.route("/status").get(getPremiumStatus);
// router.route("/leaderboard").get(paymentController.getLeaderboard);

export default router;
