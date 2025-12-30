import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation.middleware";
import { registerParams } from "../utils/registerParams";
import { NoteController } from "../controllers/Note.controller";

const notesRoutes = Router();

registerParams(notesRoutes);

notesRoutes.post(
  "/:projectId/tasks/:taskId/notes",
  body("content").notEmpty().withMessage("Content is required"),
  handleInputErrors,
  NoteController.createNote
);

notesRoutes.get("/:projectId/tasks/:taskId/notes", NoteController.getTaskNotes);
notesRoutes.delete(
  "/:projectId/tasks/:taskId/notes/:noteId",
  param("noteId").isMongoId().withMessage("Invalid note ID"),
  handleInputErrors,
  NoteController.deleteNote
);

export default notesRoutes;
