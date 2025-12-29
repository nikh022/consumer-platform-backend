import express, { type Express } from "express";
import authRoutes from "./modules/auth/authRoutes.js";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Consumer Platform Backend" });
});

export default app;