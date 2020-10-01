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

							{projects.length > 0
								? projects.map((project) => (
										<Grid key={project._id} item xs={12} md={6} lg={4}>
											<div className='project-card'>
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
