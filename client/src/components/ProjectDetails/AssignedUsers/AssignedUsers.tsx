import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useAuthContext } from '../../Context/AuthContext';
import ProjectService from '../../Services/ProjectService';

interface PersonnelInt {
	user: string; // This is the user's ID
	name: string;
	email: string;
	role: string;
}

interface Props {
	projectID: string;
	personnel: PersonnelInt[];
	setPersonnel: React.Dispatch<React.SetStateAction<PersonnelInt[]>>;
}

export const AssignedUsers: React.FC<Props> = ({
	projectID,
	personnel,
	setPersonnel,
}) => {
	// Handle success response messages
	const [message, setMessage] = useState('');

	// Handle error messages
	const [error, setError] = useState('');

	const authContext = useAuthContext();

	// I'll use this to GET the personnel again after one has been deleted
	const getProjectData = async (projectid: string) => {
		const data = await ProjectService.getProjectData(projectid);
		if (data.success) {
			setPersonnel(data.personnel);
		}
	};

	const deletePersonnel = async (personnelID: string) => {
		setMessage('');
		setError('');

		console.log(personnelID);
		const data = {
			userID: authContext.user,
			projectID,
			personnelID,
		};

		try {
			const response = await ProjectService.deletePersonnel(data);
			if (response.success) {
				// Set the success message
				setMessage(response.message);

				// Now lets update the render by sending a GET Request for my tickets
				const myTicketsResponse = await ProjectService.getProjectTickets(
					projectID
				);

				if (myTicketsResponse.success) {
					getProjectData(projectID);
				}
			} else {
				console.log(response);
				setError(response.errors.message);
			}
		} catch (error) {
			console.log(error);
			setError(error);
		}
	};

	return (
		<Grid container spacing={2} justify='center' className='assigned-users'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Assigned Personnel</h2>
				<p>Current Users on this Project</p>
			</Grid>

			<Grid container justify='center' spacing={2}>
				{error && (
					<Grid item xs={12} md={12} lg={12}>
						<h3 className='error'>{error}</h3>
					</Grid>
				)}
				{message && (
					<Grid item xs={12} md={12} lg={12}>
						<h3 className='message'>{message}</h3>
					</Grid>
				)}
				{personnel.length > 0
					? personnel.map((user) => (
							<Grid key={user.email} item xs={12} md={6} lg={6}>
								<div className='user-card'>
									<button
										className='btn-close'
										onClick={() => deletePersonnel(user.user)}
									>
										X
									</button>
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
