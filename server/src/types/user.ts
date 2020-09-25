import { Document, Model } from 'mongoose';

export interface UserInt extends Document {
	email: string;
	password: string;
}

// This will hold my static methods
export interface UserModelInt extends Model<UserInt> {
	login(email: string, password: string): Promise<any>;
}
