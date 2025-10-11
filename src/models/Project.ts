import mongoose, { Schema, Document } from "mongoose";

export interface Project extends Document {
  projectName: string;
  clientName: string;
  descripcion: string;
}

const ProjectSchema: Schema = new Schema({
  projectName: { type: String, required: true, trim: true },
  clientName: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
});

const Project = mongoose.model<Project>("Project", ProjectSchema);

export default Project;
