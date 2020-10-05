import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const requireAuth = (req: Request, res: Response, next: Function) => {
	const token = req.cookies.jwt;

	// Check if JSON Web Token Exist & is verified
	if (token) {
		jwt.verify(token, 'Symbol', (err: any, decodedToken: any) => {
			if (err) {
				console.log(err.message);
				res.redirect('/login');
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect('/login');
	}
};

// Check current user
const checkUser = (req: Request, res: Response, next: Function) => {
	const token = req.cookies.jwt;

	if (token) {
		if (process.env.SECRET) {
			jwt.verify(
				token,
				process.env.SECRET,
				async (err: any, decodedToken: any) => {
					if (err) {
						console.log(err.message);
						res.locals.user = null;
						res.locals.authenticated = false;
						next();
					} else {
						//let user = await User.findById(decodedToken.id);
						res.locals.user = decodedToken.id;
						res.locals.authenticated = true;
						next();
					}
				}
			);
		}
	} else {
		res.locals.user = null;
		res.locals.authenticated = false;
		next();
	}
};

export { requireAuth, checkUser };
