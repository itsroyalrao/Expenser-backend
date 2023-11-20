import { config } from "dotenv";
import express from "express";
import cookieSession from "cookie-session";
import passport from "passport";
import cors from "cors";

import "./passport.js";
import authRoutes from "./routes/auth.js";

config();
const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["expenser"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "https://expenser-v1.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
