import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import AuthService from '../Services/AuthService';
import { useAuthContext } from '../Context/AuthContext';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

interface IUser extends RouteComponentProps<any> {
	email?: string;
	password?: string;
}

export const Register: React.FC<IUser> = (props) => {
	// State Handles for the input fields
	const [user, setUser] = useState({ email: '', password: '' });
	const [errors, setErrors] = useState({ email: '', password: '' });
	const authContext = useAuthContext();

	const onSubmit = (event: any) => {
		event.preventDefault();
		console.log(user);

		AuthService.register(user).then((data) => {
			const { isAuthenticated, user, errors } = data;
			console.log(errors);

			if (isAuthenticated) {
				authContext.setUser(user);
				authContext.setIsAuthenticated(isAuthenticated);
				console.log(authContext);
				props.history.push('/');
			} else {
				setErrors(errors); // Set Error Message to be displayed
			}
		});
	};

	return (
		<div className='LoginRegister'>
			<Container>
				<Grid container alignItems='center' justify='center'>
					<Grid item xs={12} md={6}>
						<form onSubmit={onSubmit}>
							<p>
								<i className='fas fa-bug'></i>
								Bug_Tracker
								<br />
								Register
							</p>

							<div className='errors'>
								{Object.values(errors).map((val) => (
									<div key={val}>{val}</div>
								))}
							</div>

							<input
								type='text'
								name='email'
								placeholder='Email'
								onChange={(e) => setUser({ ...user, email: e.target.value })}
								value={user.email}
								required
							/>

							<input
								type='password'
								name='password'
								placeholder='Password'
								onChange={(e) => setUser({ ...user, password: e.target.value })}
								value={user.password}
								required
							/>
							<button>Register</button>
						</form>

						<div className='options'>
							<p>
								Already have an account? <a href='/login'>Log In</a>
							</p>
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};
