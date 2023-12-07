import Razorpay from "razorpay";
import Payment from "../models/payments.js";
// import Auth from "../models/auth.js"

const getPaymentID = async (req, res) => {
  try {
    console.log("sdjbfvjdsbvkjds");
    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const amount = 2500;
    let order = await instance.orders.create({
      amount: amount,
      currency: "INR",
    });
    res.status(201).json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
      amount,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const createPayment = async (req, res) => {
  try {
    await Payment.create(req.body);
    res.status(201).json({ msg: "payment successful" });
  } catch (error) {
    console.log(error.message);
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const userData = await Auth.find({}).sort({ totalExpense: "desc" });
    res.status(200).json({ userData });
  } catch (error) {
    console.log(error.message);
  }
};

export { createPayment, getPaymentID, getLeaderboard };
