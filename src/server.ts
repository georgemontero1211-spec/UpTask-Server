import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projects.routes";
import taskRoutes from "./routes/tasks.routes";

dotenv.config();

connectDB();

const app = express();

app.use(cors(corsConfig));
app.use(express.json());
//Routes
app.use("/api/projects", projectRoutes);
app.use("/api/projects", taskRoutes);

export default app;
