import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Personnel } from './Personnel/Personnel';

interface Props {}

export const ManageRoles: React.FC<Props> = () => {
	const assignRole = (event: any) => {
		event.preventDefault();
		console.log(event);
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
											<h3>Select a User</h3>
											<select multiple>
												<option>test1</option>
												<option>test2</option>
											</select>

											<h3>Select a Role to assign</h3>
											<select>
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
