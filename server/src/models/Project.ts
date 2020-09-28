import { model, Schema } from 'mongoose';
import { ProjectInt } from '../types/project';

const projectSchema: Schema = new Schema({});

export const Ticket = model<ProjectInt>('Project', projectSchema);
