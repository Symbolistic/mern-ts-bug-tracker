import { model, Schema } from 'mongoose';
import { TicketInt } from '../types/ticket';

const ticketSchema: Schema = new Schema({});

export const Ticket = model<TicketInt>('Ticket', ticketSchema);
