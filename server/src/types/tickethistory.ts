import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface TicketHistoryInt extends Document {
	// The Ticket ID this history is for
	ticketFrom: ObjectId;

	// User's ID
	userFrom: ObjectId;

	// User's Name
	userName: string;

	action: string;

	oldValue: string;

	newValue: string;
}
