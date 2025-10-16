import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { ITask } from "./Task.model";

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  descripcion: string;
  tasks: PopulatedDoc<ITask & Document>[];
}

const ProjectSchema: Schema = new Schema(
  {
    projectName: { type: String, required: true, trim: true },
    clientName: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Project = mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
