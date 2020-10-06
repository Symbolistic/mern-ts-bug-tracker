import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Personnel } from './Personnel/Personnel';
import ProjectService from '../Services/ProjectService';
import { useAuthContext } from '../Context/AuthContext';
import { useLocation } from 'react-router-dom';

interface MyLocationState {
	project: string;
}

interface Props extends RouteComponentProps<any, any, MyLocationState> {}

export const ManageProjectUsers: React.FC<Props> = (props) => {
	// Handle Errors
	const [error, setError] = useState({
		selectedUsers: '',
		selectedRole: '',
		message: '',
	});

	// Handle Inputs
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [selectedRole, setSelectedRole] = useState('--Select Role/None--');

	// Total Site Users and Project Personnel
	const [personnel, setPersonnel] = useState<any>([]);
	const [allUsers, setAllUsers] = useState<any[]>([]);

	// This will get me the ID of the logged in user
	const authContext = useAuthContext();

	// This will handle the location and passed down state using the useLocation hook
	const location = useLocation<MyLocationState>();

	// Grab all the team members aka Personnel working on this project
	const projectPersonnel = async (projectFrom: string) => {
		let personnel = await ProjectService.projectPersonnel({ projectFrom });
		if (personnel.users.length > 0) {
			setPersonnel(personnel.users);
		}
	};

	// Grab all the users registered on the site
	const getUsers = async (projectid: string) => {
		let totalUsers = await ProjectService.getUsers(projectid);

		setAllUsers(totalUsers.users);
	};

	useEffect(() => {
		/* This is an error checker for anyone who directly comes to this page,
		if they came here without clicking through a project, it will kick them out */
		if (location?.state?.project) {
			projectPersonnel(location.state.project);
			getUsers(location.state.project);
			console.log(location.state.project);
		} else {
			props.history.push('/');
		}
	}, [location, props.history]); // Everytime the state is updated (page change) we will recall useEffect

	// This handles the Multi-Select Element for selecting Users
	const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const options = event.target.options;

		/* This creates a shallow array for options because options is a collection
		of HTML Elements, its not an actual array, so we make it into a shallow copy of an array
		and then filter out the options that aren't selected, and then map the selected values */
		const value = Array.from(options)
			.filter((o) => o.selected === true)
			.map((o) => o.value);

		// Here we set those values into state
		setSelectedUsers(value);
	};

	// Handle function for the Roles
	const handleRoleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();

		setSelectedRole(event.target.value);
	};

	// This is where we will POST the data to the backend
	const assignRole = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Input/Form Error Handling
		setError({ selectedUsers: '', selectedRole: '', message: '' });

		if (selectedUsers.length < 1) {
			setError((oldState) => ({
				...oldState,
				selectedUsers: 'Please Select a User!',
			}));
		}

		if (selectedRole === '--Select Role/None--') {
			setError((oldState) => ({
				...oldState,
				selectedRole: 'Please Select a Role!',
			}));
		} else {
			// This gathers all the needed data together and we will POST this information
			const data = {
				userID: authContext.user,
				projectFrom: props.location.state.project,
				users: selectedUsers,
				role: selectedRole,
			};

			// Call the Assign Role function to POST to backend
			const response = await ProjectService.assignRole(data);
			if (response.success) {
				/* On success update state, we can do this better 
				later to hit the backend less <-- thats what she said */
				projectPersonnel(location.state.project);
				getUsers(location.state.project);
			} else {
				setError((oldState) => ({
					...oldState,
					message: response.errors.message,
				}));
			}
		}
	};

	return (
		<div id='ManageProjectUsers'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={2} alignItems='center' justify='center'>
							<Grid item xs={12} md={12} lg={12} className='header'>
								<h2>Manage Project Users</h2>
								<p>
									Add Users registered on the site to your team and give them a
									default role
								</p>
							</Grid>

							<Grid
								container
								spacing={2}
								className='user-select'
								justify='center'
							>
								<Grid item xs={12} md={12} lg={4}>
									<Grid item xs={12} md={12} lg={12}>
										<form onSubmit={assignRole}>
											<h3 className='error'>{error.message}</h3>
											<h3>Select 1 or more users</h3>
											<div>
												<span>{error.selectedUsers}</span>
											</div>

											<select multiple onChange={handleUserSelect}>
												{allUsers.length > 0
													? allUsers.map((user) => (
															<option key={user._id}>
																{user.name}: {user.email}
															</option>
													  ))
													: ''}
											</select>

											<h3>Select a Role to assign</h3>
											<div>
												<span>{error.selectedRole}</span>
											</div>

											<select onChange={handleRoleSelect} value={selectedRole}>
												<option>--Select Role/None--</option>
												<option>ADMIN</option>
												<option>DEVELOPER</option>
												<option>PROJECT_MANAGER</option>
											</select>
											<button>Submit</button>
										</form>
									</Grid>
								</Grid>

								<Grid item xs={12} md={12} lg={8}>
									<Personnel personnel={personnel} />
								</Grid>
							</Grid>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
