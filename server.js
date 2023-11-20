import { config } from "dotenv";
import express from "express";
import cors from "cors";
// import authRoutes from "./routes/auth.js";
import mongoose from "mongoose";

config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://expenser-v1.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
