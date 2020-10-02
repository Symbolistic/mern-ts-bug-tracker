import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface TicketCommentInt extends Document {
	comment: string;

	// The Ticket ID this comment is for
	ticketFrom: ObjectId;

	// User's ID
	commenterID: ObjectId;

	commenterName: string;
}
