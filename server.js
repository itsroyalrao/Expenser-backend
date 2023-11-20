import { config } from "dotenv";
config();
import express from "express";
import cookieSession from "cookie-session";
import passport from "passport";
import cors from "cors";
import mongoose from "mongoose";

import "./passport.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://expenser-v1.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: ["expenser"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
