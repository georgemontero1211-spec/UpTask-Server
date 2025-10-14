import { Router } from "express";
import { ProjectController } from "../controllers/Project.controller";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

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

export default projectRoutes;
