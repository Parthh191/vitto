import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import applicationRoutes from "./routes/applications.route.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL
}));


app.use(express.json());

app.use("/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

export default app;