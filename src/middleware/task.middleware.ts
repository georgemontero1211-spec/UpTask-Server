import type { Response, Request, NextFunction } from "express";
import Project, { IProject } from "../models/Project.model";
import Task, { ITask } from "../models/Task.model";

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export async function taskExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found");
      return res.status(404).json({ error: error.message });
    }
    req.task = task;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export function taskBeLongsToProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.task.project.toString() !== req.project.id.toString()) {
    const error = new Error("Action not allowed");
    return res.status(403).json({ error: error.message });
  }
  next();
}
