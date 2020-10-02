import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { AssignedUsers } from './AssignedUsers/AssignedUsers';
import { ProjectTickets } from './ProjectTickets/ProjectTickets';
import ProjectService from '../Services/ProjectService';
import { useLocation } from 'react-router-dom';

interface PersonnelInt {
	name: string;
	email: string;
	role: string;
}

interface MyLocationState {
	project: string;
}

interface Props extends RouteComponentProps<any, any, MyLocationState> {}

export const ProjectDetails: React.FC<Props> = () => {
	const [project, setProject] = useState({ name: '', description: '' });
	const [personnel, setPersonnel] = useState<PersonnelInt[]>([]);

	// This will handle the location and passed down state using the useLocation hook
	const location = useLocation<MyLocationState>();

	const getProjectData = async (projectid: string) => {
		const data = await ProjectService.getProjectData(projectid);
		if (data.success) {
			setProject(data.project);
			setPersonnel(data.personnel);
		}
	};

	useEffect(() => {
		getProjectData(location.state.project);
	}, [location]);

	return (
		<div id='ProjectDetails'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={4} justify='center'>
							<Grid item xs={12} md={12} lg={12}>
								<Grid
									container
									spacing={2}
									justify='center'
									className='info-card'
								>
									<Grid item xs={12} md={12} lg={12} className='header'>
										<h2>Details for {project.name}</h2>
										<Link to='/myprojects' className='btn'>
											<span>Back to List</span>
										</Link>

										<Link
											to={{
												pathname: '/editproject',
												state: { project: location.state.project },
											}}
											className='btn'
										>
											{' '}
											<span>Edit</span>
										</Link>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<h3>Project Name</h3>
										<p>{project.name}</p>
									</Grid>

									<Grid item xs={6} md={6} lg={6}>
										<h3>Project Description</h3>
										<p>{project.description}</p>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={12} md={6} lg={4}>
								<AssignedUsers personnel={personnel} />
							</Grid>

							<Grid item xs={12} md={6} lg={8}>
								<ProjectTickets
									projectID={location.state.project}
									project={project}
									personnel={personnel}
								/>
							</Grid>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
