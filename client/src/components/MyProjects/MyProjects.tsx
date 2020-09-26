import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

interface Props {}

export const MyProjects: React.FC<Props> = () => {
	return (
		<div id='MyProjects'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={4} alignItems='center' justify='center'>
							<Grid item xs={12} md={12} lg={12} className='header'>
								<h2>Your Projects</h2>
								<p>All the current projects you have in the database</p>
								<button>CREATE NEW PROJECT</button>
							</Grid>

							<Grid item xs={12} md={6} lg={4}>
								<div className='project-card'>
									<h3>Project Name</h3>
									<p>Project Description</p>

									<div className='project-btns'>
										<button>Manage Users</button>
										<button>Details</button>
									</div>
								</div>
							</Grid>

							<Grid item xs={12} md={6} lg={4}>
								<div className='project-card'>
									<h3>Project Name</h3>
									<p>Project Description</p>

									<div className='project-btns'>
										<button>Manage Users</button>
										<button>Details</button>
									</div>
								</div>
							</Grid>

							<Grid item xs={12} md={6} lg={4}>
								<div className='project-card'>
									<h3>Project Name</h3>
									<p>Project Description</p>

									<div className='project-btns'>
										<button>Manage Users</button>
										<button>Details</button>
									</div>
								</div>
							</Grid>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
