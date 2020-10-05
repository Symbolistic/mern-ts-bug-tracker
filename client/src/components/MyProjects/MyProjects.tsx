import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useAuthContext } from '../Context/AuthContext';
import ProjectService from '../Services/ProjectService';

// This will be the interface for the data that comes from the backend
interface myProjectsInt {
	_id: string;
	userFrom: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

interface IProjects extends RouteComponentProps<any> {}

export const MyProjects: React.FC<IProjects> = (props) => {
	// Handle success response messages
	const [message, setMessage] = useState('');

	// Handle error messages
	const [error, setError] = useState('');

	const [projects, setProjects] = useState<myProjectsInt[]>([]);
	const authContext = useAuthContext();

	// Once the page loads, run getProjects.
	/* The reason getProjects function is declared INSIDE useEffect is because
	React yells at me to make it a dependency so I just put it inside useEffect, I could also
	just use a IIFE, also I put authContext.user as a dependency because React yelled at me again :'(
	but it makes sense since we should rerender if the user info changes */
	useEffect(() => {
		const getProjects = async () => {
			const response = await ProjectService.myProjects({
				user: authContext.user,
			});
			if (response.success) {
				setProjects(response.projects);
			}
		};

		getProjects();
	}, [authContext.user]);

	// This will handle project deletion
	const deleteProject = async (projectID: string) => {
		setMessage('');
		setError('');

		const data = {
			userID: authContext.user,
			projectID,
		};

		const response = await ProjectService.deleteProject(data);

		if (response.success) {
			// Set the success message
			setMessage(response.message);

			/* I basically call the GET Projects request manually since I can't take out
			the function for getProjects from useEffect or it yells at me... */
			const getProjectResponse = await ProjectService.myProjects({
				user: authContext.user,
			});
			if (getProjectResponse.success) {
				setProjects(getProjectResponse.projects);
			}
		}
	};

	return (
		<div id='MyProjects'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={4} justify='center'>
							<Grid item xs={12} md={12} lg={12} className='header'>
								<h2>Your Projects</h2>
								<p>All the current projects you have in the database</p>
								<Link className='btn' to='/addproject'>
									CREATE NEW PROJECT
								</Link>
							</Grid>
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

							{projects.length > 0
								? projects.map((project) => (
										<Grid key={project._id} item xs={12} md={6} lg={4}>
											<div className='project-card'>
												<button
													className='btn-close'
													onClick={() => deleteProject(project._id)}
												>
													X
												</button>
												<h3>{project.name}</h3>
												<p>{project.description}</p>

												<div className='project-btns'>
													<Link
														className='btn'
														to={{
															pathname: '/manageprojectusers',
															state: { project: project._id },
														}}
													>
														Manage Users
													</Link>

													<Link
														className='btn'
														to={{
															pathname: '/projectdetails',
															state: { project: project._id },
														}}
													>
														Details
													</Link>
												</div>
											</div>
										</Grid>
								  ))
								: ''}
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
