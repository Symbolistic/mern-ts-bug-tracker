import React from 'react';
import Grid from '@material-ui/core/Grid';

interface Props {}

export const AssignedUsers: React.FC<Props> = () => {
	return (
		<Grid container spacing={2} justify='center' className='assigned-users'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Assigned Personnel</h2>
				<p>Current Users on this Project</p>
			</Grid>

			<Grid container justify='center' spacing={2}>
				<Grid item xs={12} md={6} lg={6}>
					<div className='user-card'>
						<Grid item xs={12} md={12} lg={12}>
							<h3>Username</h3>
							<p>Chef Ramsay</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Email</h3>
							<p>LambSauce401Error@hellskitchen.com</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Role</h3>
							<p>King Ramsay</p>
						</Grid>
					</div>
				</Grid>

				<Grid item xs={12} md={6} lg={6}>
					<div className='user-card'>
						<Grid item xs={12} md={12} lg={12}>
							<h3>Username</h3>
							<p>Symbol</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Email</h3>
							<p>SymbolTilted401Error@helpme.com</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Role</h3>
							<p>King Symbol</p>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
};
