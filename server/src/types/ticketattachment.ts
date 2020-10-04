import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface TicketAttachmentInt extends Document {
	fileName: string;
	notes: string;

	// The Ticket ID this comment is for
	ticketFrom: ObjectId;

	// User's ID
	userID: ObjectId;

	userName: string;

	fileSrc: string;
}
