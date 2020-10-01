import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ProjectService from '../Services/ProjectService';
import { useAuthContext } from '../Context/AuthContext';
import { useLocation } from 'react-router-dom';

interface MyLocationState {
	project: string;
}

interface Props extends RouteComponentProps<any, any, MyLocationState> {}

export const EditProject: React.FC<Props> = () => {
	// This holds the basic project info from the database
	const [project, setProject] = useState({ name: '', description: '' });
	const [projectInfo, setProjectInfo] = useState({
		name: '',
		description: '',
	});

	// Error Message State
	const [errors, setErrors] = useState({ message: '' });

	// This will get me the ID of the logged in user
	const authContext = useAuthContext();

	// This will handle the location and passed down state using the useLocation hook
	const location = useLocation<MyLocationState>();

	const getProjectData = async (projectid: string) => {
		const data = await ProjectService.getProjectData(projectid);
		if (data.success) {
			setProject(data.project);
		}
	};

	const updateProjectInfo = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const info = {
			projectID: location.state.project,
			name: projectInfo.name,
			description: projectInfo.description,
			user: authContext.user,
		};
		const data = await ProjectService.updateProject(info);

		if (data.success) {
			getProjectData(location.state.project);
		} else {
			console.log(data.errors);
			setErrors({ message: data.errors.message });
		}
	};

	useEffect(() => {
		getProjectData(location.state.project);
	}, [location]);

	return (
		<div id='EditProject'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={2} alignItems='center' justify='center'>
							<Grid item xs={12} md={12} lg={12} className='header'>
								<h2>Edit Project</h2>
								<p>Change Project properties and authorized personnel</p>
							</Grid>

							<Grid container spacing={2} className='project-info'>
								<Grid item xs={6} md={6} lg={6}>
									<h3>Title</h3>
									<p>{project.name}</p>
								</Grid>

								<Grid item xs={6} md={6} lg={6}>
									<h3>Description</h3>
									<p>{project.description}</p>
								</Grid>

								<Grid item xs={6} md={6} lg={6}>
									<h3 className='error'>{errors.message}</h3>
									<form onSubmit={updateProjectInfo}>
										<h3>Edit Title</h3>
										<input
											type='text'
											name='name'
											placeholder='Name'
											required={true}
											onChange={(e) =>
												setProjectInfo({
													...projectInfo,
													name: e.target.value,
												})
											}
											value={projectInfo.name}
										/>
										<button>Submit</button>
									</form>
								</Grid>

								<Grid item xs={6} md={6} lg={6}>
									<form onSubmit={updateProjectInfo}>
										<h3 className='error'>{errors.message}</h3>
										<h3>Edit Description</h3>
										<input
											type='text'
											name='description'
											placeholder='Description'
											required={true}
											onChange={(e) =>
												setProjectInfo({
													...projectInfo,
													description: e.target.value,
												})
											}
											value={projectInfo.description}
										/>
										<button>Submit</button>
									</form>
								</Grid>
							</Grid>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
