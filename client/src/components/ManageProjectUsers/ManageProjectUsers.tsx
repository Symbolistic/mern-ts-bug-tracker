import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

interface Props {}

export const ManageProjectUsers: React.FC<Props> = () => {
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
								<h2>Edit Ticket</h2>
								<p>Change ticket properties</p>
							</Grid>

							<Grid container spacing={2} className='ticket-info'>
								<Grid item xs={6} md={6} lg={6}>
									<h3>Title</h3>
									<p>WE NEED LAMB SAUCE</p>
								</Grid>

								<Grid item xs={6} md={6} lg={6}>
									<h3>Description</h3>
									<p>ITS RAW!!!!!</p>
								</Grid>
							</Grid>

							<Grid item xs={6} md={6} lg={6}>
								<h3>Project</h3>
								<select>
									<option value='grapefruit'>Grapefruit</option>
									<option value='lime'>Lime</option>
									<option selected value='coconut'>
										Coconut
									</option>
									<option value='mango'>Mango</option>
								</select>
							</Grid>
							<Grid item xs={6} md={6} lg={6}>
								<h3>Assigned Developer</h3>
								<select>
									<option value='grapefruit'>Grapefruit</option>
									<option value='lime'>Lime</option>
									<option selected value='coconut'>
										Coconut
									</option>
									<option value='mango'>Mango</option>
								</select>
							</Grid>

							<Grid item xs={6} md={6} lg={6}>
								<h3>Ticket Priority</h3>
								<select>
									<option value='grapefruit'>Grapefruit</option>
									<option value='lime'>Lime</option>
									<option selected value='coconut'>
										Coconut
									</option>
									<option value='mango'>Mango</option>
								</select>
							</Grid>
							<Grid item xs={6} md={6} lg={6}>
								<h3>Ticket Status</h3>
								<select>
									<option value='grapefruit'>Grapefruit</option>
									<option value='lime'>Lime</option>
									<option selected value='coconut'>
										Coconut
									</option>
									<option value='mango'>Mango</option>
								</select>
							</Grid>

							<Grid item xs={6} md={6} lg={6}>
								<h3>Ticket Type</h3>
								<select>
									<option value='grapefruit'>Grapefruit</option>
									<option value='lime'>Lime</option>
									<option selected value='coconut'>
										Coconut
									</option>
									<option value='mango'>Mango</option>
								</select>
							</Grid>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
