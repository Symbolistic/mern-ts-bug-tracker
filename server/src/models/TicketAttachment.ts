import { model, Schema } from 'mongoose';
import { TicketAttachmentInt } from '../types/ticketattachment';

const ticketAttachmentSchema: Schema = new Schema(
	{
		fileName: { type: String, required: true },
		notes: { type: String, required: true, maxlength: 200 },

		// The Ticket ID this comment is for
		ticketFrom: {
			type: Schema.Types.ObjectId,
			ref: 'Ticket',
			required: true,
		},
		// User's ID
		userID: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		userName: {
			type: String,
			required: true,
		},

		fileSrc: { type: String, required: true },
	},
	{ timestamps: true }
);

export const TicketAttachment = model<TicketAttachmentInt>(
	'TicketAttachment',
	ticketAttachmentSchema
);
