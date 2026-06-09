import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import applicationRoutes from "./routes/applications.route.js";
dotenv.config();
const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL ;
if(!FRONTEND_URL) {
    console.error("FRONTEND_URL is not defined in .env file");
    process.exit(1);
}
app.use(cors({
    origin: FRONTEND_URL
}));
app.use(express.json());
// 404 handler
app.use("/applications", applicationRoutes);
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;