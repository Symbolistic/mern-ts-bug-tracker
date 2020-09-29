import { Document, Schema } from 'mongoose';

export interface ProjectInt extends Document {
	userFrom: Schema.Types.ObjectId;
	name: string;
	description: string;
}
