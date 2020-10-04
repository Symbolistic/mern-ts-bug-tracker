import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { TicketComments } from './TicketComments/TicketComments';
import { TicketHistory } from './TicketHistory/TicketHistory';
import { TicketAttachments } from './TicketAttachments/TicketAttachments';
import { useLocation } from 'react-router-dom';
import TicketService from '../Services/TicketService';

interface MyLocationState {
	ticketID: string;
}

interface Props extends RouteComponentProps<any, any, MyLocationState> {}

export const TicketDetails: React.FC<Props> = () => {
	// This will handle the location and passed down state using the useLocation hook
	const location = useLocation<MyLocationState>();

	// Ticket Details will be stored in this state
	const [ticketDetails, setTicketDetails] = useState({
		title: '',
		projectName: '',
		developerAssigned: '',
		priority: '',
		status: '',
		type: '',
		createdAt: '',
		updatedAt: '',
	});

	useEffect(() => {
		const grabTicketDetails = async (id: string) => {
			const response = await TicketService.getTicketDetails(id);
			if (response.success) {
				setTicketDetails({
					title: response.ticket.title,
					projectName: response.ticket.projectName,
					developerAssigned: response.ticket.developerAssignedName,
					priority: response.ticket.priority,
					status: response.ticket.status,
					type: response.ticket.type,
					createdAt: response.ticket.createdAt,
					updatedAt: response.ticket.updatedAt,
				});
			}
		};
		grabTicketDetails(location.state.ticketID);
	}, [location.state.ticketID]);

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

										<Link
											to={{
												pathname: '/editticket',
												state: { ticketID: location.state.ticketID },
											}}
											className='btn'
										>
											{' '}
											<span>Edit</span>
										</Link>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<h3>Title</h3>
										<p>{ticketDetails.title}</p>
									</Grid>

									<Grid item xs={6} md={6} lg={6}>
										<h3>Project Name</h3>
										<p>{ticketDetails.projectName}</p>
									</Grid>

									<Grid item xs={6} md={6} lg={6}>
										<h3>Developer Assigned</h3>
										<p>{ticketDetails.developerAssigned}</p>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<h3>Ticket Priority</h3>
										<p>{ticketDetails.priority}</p>
									</Grid>

									<Grid item xs={6} md={6} lg={6}>
										<h3>Ticket Status</h3>
										<p>{ticketDetails.status}</p>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<h3>Ticket Type</h3>
										<p>{ticketDetails.type}</p>
									</Grid>

									<Grid item xs={6} md={6} lg={6}>
										<h3>Created On</h3>
										<p>{ticketDetails.createdAt}</p>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<h3>Updated On</h3>
										<p>{ticketDetails.updatedAt}</p>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={12} md={8} lg={8}>
								<TicketComments ticketID={location.state.ticketID} />
							</Grid>

							<Grid item xs={12} md={6} lg={6}>
								<TicketHistory ticketID={location.state.ticketID} />
							</Grid>

							<Grid item xs={12} md={6} lg={6}>
								<TicketAttachments ticketID={location.state.ticketID} />
							</Grid>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
