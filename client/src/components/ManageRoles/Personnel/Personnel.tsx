import React from 'react';
import Grid from '@material-ui/core/Grid';

interface Props {}

export const Personnel: React.FC<Props> = () => {
	return (
		<Grid container spacing={2} justify='center' className='personnel'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Your Personnel</h2>
				<p>These are all the users in your database, AKA your personal team.</p>
			</Grid>

			<Grid container justify='center' spacing={2}>
				<Grid item xs={6} md={6} lg={6}>
					<div className='user-card'>
						<Grid item xs={12} md={12} lg={12}>
							<h3>Email</h3>
							<p>Chef Ramsay</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Role</h3>
							<p>King</p>
						</Grid>
					</div>
				</Grid>
				<Grid item xs={6} md={6} lg={6}>
					<div className='user-card'>
						<Grid item xs={12} md={12} lg={12}>
							<h3>Email</h3>
							<p>Chef Ramsay</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Role</h3>
							<p>King</p>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
};
