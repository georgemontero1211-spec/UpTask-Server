import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation.middleware";
import { ProjectController } from "../controllers/Project.controller";
import { authenticate } from "../middleware/auth.middleware";
import { TeamMemberController } from "../controllers/Team.controller";
import { projectExists } from "../middleware/project.middleware";

const projectRoutes = Router();
projectRoutes.use(authenticate);
projectRoutes.param("projectId", projectExists);

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

/**
 * Routes for team
 */

projectRoutes.post(
  "/:projectId/team/find",
  body("email").isEmail().toLowerCase().withMessage("E-mail no valido"),
  handleInputErrors,
  TeamMemberController.findMemberByEmail
);

projectRoutes.get(
  "/:projectId/team",
  TeamMemberController.getProjectTeam
);

projectRoutes.post(
  "/:projectId/team",
  body("id").isMongoId().withMessage("ID No valido"),
  handleInputErrors,
  TeamMemberController.addMemberById
);

projectRoutes.delete(
  "/:projectId/team/:userId",
  param("userId").isMongoId().withMessage("ID No valido"),
  handleInputErrors,
  TeamMemberController.removeMemberById
);
export default projectRoutes;
