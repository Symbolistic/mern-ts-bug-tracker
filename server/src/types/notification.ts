import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

enum ReadStatus {
	READ = 'READ',
	UNREAD = 'UNREAD',
}

export interface NotificationInt extends Document {
	message: string;

	// The Project ID this notification is for
	projectFrom: ObjectId;

	// User's ID this notification is being sent to
	userID: ObjectId;

	readStatus: string;
}

export default ReadStatus;
