import { Response, Request } from 'express';
import { UserInt } from '../types/user';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

interface MyDetailedError {
	properties: {
		path: string;
		message: string;
	};
}

interface MyError {
	message: string;
	code: number;
	errors: MyDetailedError[];
}

// Handle Errors
const handleErrors = (err: MyError) => {
	console.log(err.message, err.code);

	/* If you didn't have { [key: string]: string }, errors would expect only "email" or "password" as keys
	and would error out if it gets anything else. so we say { [key: string]: string }, this breaks down to
	1. { } says it will be an object
	2. [key: string] says the key will be a string, so instead of only 'email' or 'password', it can be ANYYYY STRING
	3. : string says the value will always be string 
	So when we put the variable path into the brackets for errors, it wont give us any issues */
	let errors: { [key: string]: string } = { email: '', password: '' };

	if (err.message === 'Email not found!') {
		errors.email = err.message;
	}

	if (err.message === 'Incorrect Password!') {
		errors.password = err.message;
	}

	// Duplicate Error Code
	if (err.code === 11000) {
		errors.email = 'This email is already registered';
		return errors;
	}

	// Validation Errors
	if (err.message.includes('User validation failed')) {
		// I had to put error: any because it kept implicity giving it the type of 'unknown'
		Object.values(err.errors).forEach((error) => {
			const path = error.properties.path;
			const message = error.properties.message;

			errors[path] = message;
		});
	}

	return errors;
};

// Create JWT
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: object) => {
	return jwt.sign({ id }, 'Symbol', {
		expiresIn: maxAge,
	});
};

// Route Controllers
const register_get = (req: Request, res: Response) => {
	res.render('signup');
};

const login_get = (req: Request, res: Response) => {
	res.render('login');
};

const register_post = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

	try {
		const user: UserInt = await User.create({ email, password });
		const token = createToken(user._id);
		res.cookie('jwt', token, {
			httpOnly: true,
			maxAge: maxAge * 1000,
			sameSite: true,
		});
		res.status(201).json({ user: user._id, isAuthenticated: true });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

const login_post = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user: UserInt = await User.login(email, password);
		const token = createToken(user._id);
		res.cookie('jwt', token, {
			httpOnly: true,
			maxAge: maxAge * 1000,
			sameSite: true,
		});
		res.status(200).json({ user: user._id, isAuthenticated: true });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors, isAuthenticated: false });
	}
};

const logout_get = (req: Request, res: Response) => {
	// This will replace the logged in JWT Token with a blank one that expires in 1 millisecond
	// Basically this will log them out and delete the cookie
	res.cookie('jwt', '', { maxAge: 1 });
	res.status(200).json({ user: '', isAuthenticated: false });
};

const authenticated = (req: Request, res: Response) => {
	const { user, authenticated } = res.locals;

	if (authenticated) {
		res.status(200).json({ user, isAuthenticated: true });
	} else {
		res.status(401).json({ user: '', isAuthenticated: false });
	}
};

export {
	register_get,
	register_post,
	login_get,
	login_post,
	logout_get,
	authenticated,
};
