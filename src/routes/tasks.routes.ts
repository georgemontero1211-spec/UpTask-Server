import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/Task.controller";

const taskRoutes = Router();

taskRoutes.post("/:projectId/tasks", TaskController.createTask);

export default taskRoutes;
