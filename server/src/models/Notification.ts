import { model, Schema } from 'mongoose';
import ReadStatus, { NotificationInt } from '../types/notification';

const NotificationSchema: Schema = new Schema(
	{
		message: { type: String, required: true },

		// The Project ID this notification is for
		projectFrom: {
			type: Schema.Types.ObjectId,
			ref: 'Ticket',
			required: true,
		},

		// User's ID this notification is being sent to
		userID: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		readStatus: {
			type: String,
			enum: [ReadStatus.READ, ReadStatus.UNREAD],
			required: true,
		},
	},
	{ timestamps: true }
);

export const Notification = model<NotificationInt>(
	'Notification',
	NotificationSchema
);
