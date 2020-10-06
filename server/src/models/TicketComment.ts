import { model, Schema } from 'mongoose';
import { TicketCommentInt } from '../types/ticketcomment';

const ticketCommentSchema: Schema = new Schema(
	{
		comment: { type: String, required: true, maxlength: 200 },

		// The Ticket ID this comment is for
		ticketFrom: {
			type: Schema.Types.ObjectId,
			ref: 'Ticket',
			required: true,
		},
		// User's ID
		commenterID: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		commenterName: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const TicketComment = model<TicketCommentInt>(
	'TicketComment',
	ticketCommentSchema
);
