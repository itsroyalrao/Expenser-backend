import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  expenseType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  firstExpenseTime: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("expense", expenseSchema);
