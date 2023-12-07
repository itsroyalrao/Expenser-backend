import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});

export default mongoose.model("Payment", paymentSchema);
