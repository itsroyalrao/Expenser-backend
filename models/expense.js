import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("expense", expenseSchema);
