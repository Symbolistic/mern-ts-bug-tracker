import { model, Schema } from 'mongoose';
import { TicketHistoryInt } from '../types/tickethistory';

const ticketHistorySchema: Schema = new Schema(
	{
		// The Ticket ID this history is for
		ticketFrom: {
			type: Schema.Types.ObjectId,
			ref: 'Ticket',
			required: true,
		},
		// User's ID
		userFrom: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		// User's Name
		userName: {
			type: String,
			required: true,
		},

		action: {
			type: String,
			required: true,
		},
		oldValue: {
			type: String,
			required: true,
		},
		newValue: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const TicketHistory = model<TicketHistoryInt>(
	'TicketHistory',
	ticketHistorySchema
);
