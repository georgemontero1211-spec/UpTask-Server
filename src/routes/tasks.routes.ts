import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation.middleware";
import { TaskController } from "../controllers/Task.controller";
import { projectExists } from "../middleware/project.middleware";
import {
  taskBeLongsToProject,
  taskExists,
} from "../middleware/task.middleware";

const taskRoutes = Router();

taskRoutes.param("projectId", projectExists);
taskRoutes.param("taskId", taskExists);
taskRoutes.param("taskId", taskBeLongsToProject);

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

taskRoutes.delete(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Id invalid"),
  handleInputErrors,
  TaskController.deleteTask
);

taskRoutes.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("Id invalid"),
  body("status").notEmpty().withMessage("Status is required"),
  handleInputErrors,
  TaskController.updateTaskStatus
);

export default taskRoutes;
