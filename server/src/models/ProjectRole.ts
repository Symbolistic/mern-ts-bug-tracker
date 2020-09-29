import { model, Schema } from 'mongoose';
import Role, { ProjectRoleInt } from '../types/projectrole';

const projectRoleSchema: Schema = new Schema({
	// User's ID
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	// The Project this role is for
	projectFrom: {
		type: Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
	role: {
		type: String,
		enum: [Role.OWNER, Role.ADMIN, Role.DEVELOPER, Role.PROJECT_MANAGER],
		required: true,
	},
});

export const ProjectRole = model<ProjectRoleInt>(
	'ProjectRole',
	projectRoleSchema
);
