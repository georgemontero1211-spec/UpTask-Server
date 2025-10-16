import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { ProjectController } from "../controllers/Project.controller";

const projectRoutes = Router();

projectRoutes.post(
  "/",
  body("projectName").notEmpty().withMessage("Project name is required"),
  body("descripcion").notEmpty().withMessage("Descripcion is required"),
  body("clientName").notEmpty().withMessage("clientName is required"),
  handleInputErrors,
  ProjectController.createProject
);
projectRoutes.get("/", ProjectController.getAllProjects);
projectRoutes.get(
  "/:id",
  param("id").isMongoId().withMessage("Id invalid"),
  handleInputErrors,
  ProjectController.getProjectById
);
projectRoutes.put(
  "/:id",
  param("id").isMongoId().withMessage("Id invalid"),
  body("projectName").notEmpty().withMessage("Project name is required"),
  body("descripcion").notEmpty().withMessage("Descripcion is required"),
  body("clientName").notEmpty().withMessage("clientName is required"),
  handleInputErrors,
  ProjectController.updateProject
);
projectRoutes.delete(
  "/:id",
  param("id").isMongoId().withMessage("Id invalid"),
  handleInputErrors,
  ProjectController.deleteProject
);

export default projectRoutes;
