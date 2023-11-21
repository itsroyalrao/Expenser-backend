import { config } from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

config();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.json());
app.use(
  cors({
    origin: ["https://expenser-v1.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
