import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation.middleware";
import { TaskController } from "../controllers/Task.controller";
import { validateProjectExists } from "../middleware/project.middleware";

const taskRoutes = Router();

taskRoutes.param("projectId", validateProjectExists);

taskRoutes.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("Name is required"),
  body("descripcion").notEmpty().withMessage("Descripcion is required"),
  handleInputErrors,
  TaskController.createTask
);

taskRoutes.get("/:projectId/tasks", TaskController.getProjectTasks);

taskRoutes.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Id invalid"),
  handleInputErrors,
  TaskController.getTaskById
);

taskRoutes.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Id invalid"),
  body("name").notEmpty().withMessage("Name is required"),
  body("descripcion").notEmpty().withMessage("Descripcion is required"),
  handleInputErrors,
  TaskController.updateTask
);

export default taskRoutes;
