import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

// These are the Roles for the Project Personnel
export enum Priority {
	LOW = 'Low',
	MEDIUM = 'Medium',
	HIGH = 'High',
}

export enum Status {
	NEW = 'New',
	OPEN = 'Open',
	IN_PROGRESS = 'In_Progress',
	RESOLVED = 'Resolved',
	ADDITIONAL_INFO_REQUIRED = 'Additional_Info_Required',
}

export enum Type {
	BUGS_ERROR = 'Bugs/Errors',
	FEATURE_REQUEST = 'Feature_Request',
	OTHER_COMMENTS = 'Other_Comments',
	TRAINING_DOCUMENT_REQUESTS = 'Training/Document_Requests',
}

export interface TicketInt extends Document {
	title: string;
	description: string;

	// The Project this role is for
	projectFrom: ObjectId;

	projectName: string;

	// User's ID
	developerAssignedID: ObjectId;

	developerAssignedName: string;

	priority: string;

	status: string;

	type: string;
}
