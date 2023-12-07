import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
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
