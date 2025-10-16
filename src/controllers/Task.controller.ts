import type { Request, Response } from "express";
import Task from "../models/Task.model";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);

      await Promise.allSettled([task.save(), req.project.save()]);
      res.send("Task created successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project"
      );
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);

      if (!task) {
        const error = new Error("Task not found");
        return res.status(404).json({ error: error.message });
      }

      if (task.project.toString() !== req.project.id) {
        const error = new Error("Action not allowed");
        return res.status(403).json({ error: error.message });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findByIdAndUpdate(taskId, req.body);

      if (!task) {
        const error = new Error("Task not found");
        return res.status(404).json({ error: error.message });
      }
      if (task.project.toString() !== req.project.id) {
        const error = new Error("Action not allowed");
        return res.status(403).json({ error: error.message });
      }

      res.send("Task updated successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
