import React, { useEffect, useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Personnel } from './Personnel/Personnel';
import ProjectService from '../Services/ProjectService';

interface Props {}

export const ManageRoles: React.FC<Props> = () => {
	// Handle Errors
	const [error, setError] = useState({ selectedUsers: '', selectedRole: '' });

	// Handle Inputs
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [selectedRole, setSelectedRole] = useState('--Select Role/None--');

	useEffect(() => {
		const test = async () => {
			//let variable = await ProjectService.getUsers();
			//console.log(variable);
		};
		test();
	}, []);

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
		console.log(event.target.value);
		setSelectedRole(event.target.value);
	};

	// This is where we will POST the data to the backend
	const assignRole = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError({ selectedUsers: '', selectedRole: '' });

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
		}
	};

	return (
		<div id='ManageRoles'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={2} alignItems='center' justify='center'>
							<Grid item xs={12} md={12} lg={12} className='header'>
								<h2>Manage User Roles</h2>
								<p>
									Add Users registered on the site to your team and give them a
									default role
								</p>
							</Grid>

							<Grid container spacing={2} className='user-select'>
								<Grid item xs={12} md={4} lg={4}>
									<Grid item xs={12} md={12} lg={12}>
										<form onSubmit={assignRole}>
											<h3>Select 1 or more users</h3>
											<span>{error.selectedUsers}</span>
											<select multiple onChange={handleUserSelect}>
												<option value='test1'>test1</option>
												<option value='test2'>test2</option>
											</select>

											<h3>Select a Role to assign</h3>
											<span>{error.selectedRole}</span>
											<select onChange={handleRoleSelect} value={selectedRole}>
												<option>--Select Role/None--</option>
												<option>hmmm</option>
												<option>tesooot2</option>
											</select>
											<button>Submit</button>
										</form>
									</Grid>
								</Grid>

								<Grid item xs={12} md={8} lg={8}>
									<Personnel />
								</Grid>
							</Grid>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
