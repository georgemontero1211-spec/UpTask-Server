import { Router } from "express";
import { projectExists } from "../middleware/project.middleware";
import {
  taskBeLongsToProject,
  taskExists,
} from "../middleware/task.middleware";

export const registerParams = (router: Router) => {
  router.param("projectId", projectExists);
  router.param("taskId", taskExists);
  router.param("taskId", taskBeLongsToProject);
};
