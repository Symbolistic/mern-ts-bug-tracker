import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useAuthContext } from '../Context/AuthContext';
import ProjectService from '../Services/ProjectService';

interface Props extends RouteComponentProps {}

export const AddProject: React.FC<Props> = (props) => {
	// Handle error messages
	const [error, setError] = useState('');

	const [info, setInfo] = useState({ name: '', description: '' });
	const authContext = useAuthContext();

	const createProject = async (event: any) => {
		event.preventDefault();

		// Combine User ID with Submitted Info for Project
		const data = {
			userFrom: authContext.user,
			...info,
		};
		const response = await ProjectService.createProject(data); // POST the Data/Fetch Response

		// If Successful, go back to My Projects Page
		if (response.projectCreated) {
			props.history.push('/myprojects');
		} else {
			if (response.error.message) {
				setError(response.errors.message);
			} else {
				setError('An unknown error has occured');
			}
		}
	};

	return (
		<div id='AddProject'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={2} alignItems='center'>
							<form onSubmit={createProject}>
								<Grid item xs={12} md={12} lg={12} className='header'>
									<h2>Add Project</h2>
									<p>Change Project properties and authorized personnel</p>
								</Grid>

								{error && (
									<Grid item xs={12} md={12} lg={12}>
										<h3 className='error'>{error}</h3>
									</Grid>
								)}

								<Grid item xs={12} md={6} lg={6}>
									<h3>Project Name</h3>
									<input
										onChange={(e) => setInfo({ ...info, name: e.target.value })}
										value={info.name}
										maxLength={70}
										required={true}
									/>
								</Grid>
								<Grid item xs={12} md={6} lg={6}>
									<h3>Project Description</h3>
									<input
										onChange={(e) =>
											setInfo({ ...info, description: e.target.value })
										}
										value={info.description}
										maxLength={200}
										required={true}
									/>
								</Grid>
								<button>Submit</button>
							</form>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
