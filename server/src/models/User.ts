import { UserInt, UserModelInt } from '../types/user';
import { model, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';

const userSchema: Schema = new Schema({
	email: {
		type: String,
		required: [true, 'Please enter an email'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please enter a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [6, 'Minimum password length is 6 characters'],
	},
});

// Fire a function before doc is saved to the database
userSchema.pre<UserInt>('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Static method to login user
userSchema.statics.login = async function (email: string, password: string) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password); // Compare input password to database hashed password

		if (auth) {
			return user;
		}
		throw Error('Incorrect Password!'); // If password was wrong, throw this
	}
	throw Error('Email not found!'); // If email not found, throw this
};

export const User = model<UserInt, UserModelInt>('User', userSchema);
