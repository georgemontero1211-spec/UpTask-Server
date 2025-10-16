import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projects.routes";
import taskRoutes from "./routes/tasks.routes";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
//Routes
app.use("/api/projects", projectRoutes);
app.use("/api/projects", taskRoutes);

export default app;
