import { model, Schema } from 'mongoose';
import { ProjectInt } from '../types/project';

const projectSchema: Schema = new Schema(
	{
		// Project Owner
		userFrom: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: { type: String, required: true, maxlength: 70 },
		description: { type: String, required: true, maxlength: 200 },
	},
	{ timestamps: true }
);

export const Project = model<ProjectInt>('Project', projectSchema);
