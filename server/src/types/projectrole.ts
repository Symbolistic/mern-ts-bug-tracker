import { Document, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

// These are the Roles for the Project Personnel
enum Role {
	OWNER = 'OWNER',
	ADMIN = 'ADMIN',
	DEVELOPER = 'DEVELOPER',
	PROJECT_MANAGER = 'PROJECT_MANAGER',
}

export interface ProjectRoleInt extends Document {
	user: ObjectId;
	projectFrom: ObjectId;
	name: string;
	email: string;
	role: string;
}

export default Role;
