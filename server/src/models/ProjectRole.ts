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
	name: {
		type: String,
		required: [true, 'Please enter your name'],
	},
	email: {
		type: String,
		required: [true, 'Please enter an email'],
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
