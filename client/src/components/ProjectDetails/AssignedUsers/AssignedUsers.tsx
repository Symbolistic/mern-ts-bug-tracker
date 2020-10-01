import React from 'react';
import Grid from '@material-ui/core/Grid';

interface PersonnelInt {
	name: string;
	email: string;
	role: string;
}

interface Props {
	personnel: PersonnelInt[];
}

export const AssignedUsers: React.FC<Props> = ({ personnel }) => {
	return (
		<Grid container spacing={2} justify='center' className='assigned-users'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Assigned Personnel</h2>
				<p>Current Users on this Project</p>
			</Grid>

			<Grid container justify='center' spacing={2}>
				{personnel.length > 0
					? personnel.map((user) => (
							<Grid key={user.email} item xs={12} md={6} lg={6}>
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
