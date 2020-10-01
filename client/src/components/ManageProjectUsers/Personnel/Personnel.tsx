import React from 'react';
import Grid from '@material-ui/core/Grid';

interface Props {
	personnel: [
		{
			_id: string;
			name: string;
			email: string;
			role: string;
		}
	];
}

export const Personnel: React.FC<Props> = ({ personnel }) => {
	return (
		<Grid container spacing={2} justify='center' className='personnel'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Your Personnel</h2>
				<p>These are all the users in your database, AKA your personal team.</p>
			</Grid>

			<Grid container justify='center' spacing={2}>
				{personnel.length > 0
					? personnel.map((user) => (
							<Grid key={user._id} item xs={6} md={4} lg={4}>
								<div className='user-card'>
									<Grid item xs={12} md={12} lg={12}>
										<h3>Name</h3>
										<p>{user.name}</p>
									</Grid>

									<Grid item xs={12} md={12} lg={12}>
										<h3>Email</h3>
										<p>{user.email}</p>
									</Grid>

									<Grid item xs={12} md={12} lg={12}>
										<h3>Role</h3>
										<p>{user.role}</p>
									</Grid>
								</div>
							</Grid>
					  ))
					: ''}
			</Grid>
		</Grid>
	);
};
