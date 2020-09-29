import { Document, Schema } from 'mongoose';

// These are the Roles for the Project Personnel
enum Role {
	OWNER = 'OWNER',
	ADMIN = 'ADMIN',
	DEVELOPER = 'DEVELOPER',
	PROJECT_MANAGER = 'PROJECT_MANAGER',
}

export interface ProjectRoleInt extends Document {
	user: Schema.Types.ObjectId;
	projectFrom: Schema.Types.ObjectId;
	role: string;
}

export default Role;
