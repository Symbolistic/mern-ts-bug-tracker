import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { TicketComments } from './TicketComments/TicketComments';
import { TicketHistory } from './TicketHistory/TicketHistory';
import { TicketAttachments } from './TicketAttachments/TicketAttachments';

interface Props {}

export const TicketDetails: React.FC<Props> = () => {
	return (
		<div id='TicketDetails'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={4} justify='center'>
							<Grid item xs={12} md={4} lg={4}>
								<Grid
									container
									spacing={2}
									justify='center'
									className='info-card'
								>
									<Grid item xs={12} md={12} lg={12} className='header'>
										<h2>Ticket Details</h2>
										<p>All the current tickets you have in the database</p>

										<Link to='/mytickets' className='btn'>
											<span>Back to List</span>
										</Link>

										<Link to='/editticket' className='btn'>
											{' '}
											<span>Edit</span>
										</Link>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<h3>Title</h3>
										<p>WE NEED LAMB SAUCE</p>
									</Grid>

									<Grid item xs={6} md={6} lg={6}>
										<h3>Project Name</h3>
										<p>ITS RAW!!!!!</p>
									</Grid>

									<Grid item xs={6} md={6} lg={6}>
										<h3>Developer Assigned</h3>
										<p>Chef Ramsay</p>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<h3>Ticket Priority</h3>
										<p>High</p>
									</Grid>

									<Grid item xs={6} md={6} lg={6}>
										<h3>Ticket Status</h3>
										<p>Open</p>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<h3>Ticket Type</h3>
										<p>Bugs/Errors</p>
									</Grid>

									<Grid item xs={6} md={6} lg={6}>
										<h3>Created On</h3>
										<p>09/26/2020 05:00AM</p>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<h3>Updated On</h3>
										<p>09/26/2020 05:00AM</p>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={12} md={8} lg={8}>
								<TicketComments />
							</Grid>

							<Grid item xs={12} md={6} lg={6}>
								<TicketHistory />
							</Grid>

							<Grid item xs={12} md={6} lg={6}>
								<TicketAttachments />
							</Grid>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
