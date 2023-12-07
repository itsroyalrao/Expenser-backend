import { config } from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import homeRoutes from "./routes/home.js";
import paymentRoute from "./routes/payments.js";

config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://expenser-v1.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
app.use("/payment", paymentRoute);

mongoose.connect(process.env.MONGO_URI);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
