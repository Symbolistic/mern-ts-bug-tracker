import { model, Schema } from 'mongoose';
import { Priority, Status, Type, TicketInt } from '../types/ticket';

const ticketSchema: Schema = new Schema(
	{
		title: { type: String, required: true, maxlength: 70 },
		description: { type: String, required: true, maxlength: 200 },

		// The Project this role is for
		projectFrom: {
			type: Schema.Types.ObjectId,
			ref: 'Project',
			required: true,
		},

		projectName: { type: String, required: true },

		// User's ID
		developerAssignedID: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		developerAssignedName: {
			type: String,
			required: true,
		},

		priority: {
			type: String,
			enum: [Priority.LOW, Priority.MEDIUM, Priority.HIGH],
			required: true,
		},

		status: {
			type: String,
			enum: [
				Status.NEW,
				Status.OPEN,
				Status.IN_PROGRESS,
				Status.RESOLVED,
				Status.ADDITIONAL_INFO_REQUIRED,
			],
			required: true,
		},

		type: {
			type: String,
			enum: [
				Type.BUGS_ERROR,
				Type.FEATURE_REQUEST,
				Type.OTHER_COMMENTS,
				Type.TRAINING_DOCUMENT_REQUESTS,
			],
			required: true,
		},
	},
	{ timestamps: true }
);

export const Ticket = model<TicketInt>('Ticket', ticketSchema);
