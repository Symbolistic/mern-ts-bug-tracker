import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TicketService from '../Services/TicketService';
import { useAuthContext } from '../Context/AuthContext';

interface TicketInt {
	_id: string;
	title: string;
	description: string;
	projectName: string;
	projectFrom: string;
	developerAssignedName: string;
	priority: string;
	status: string;
	type: string;
	createdAt: Date;
}

interface ITickets extends RouteComponentProps<any> {}

export const MyTickets: React.FC<ITickets> = (props) => {
	const [myTickets, setMyTickets] = useState<TicketInt[]>([]);
	const authContext = useAuthContext();

	useEffect(() => {
		const getTickets = async (id: string) => {
			const response = await TicketService.getMyTickets(id);

			if (response.success) {
				setMyTickets(response.tickets);
			}
		};
		getTickets(authContext.user);
	}, [authContext.user]);

	return (
		<div id='MyTickets'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={4} justify='center'>
							<Grid item xs={12} md={12} lg={12} className='header'>
								<h2>Your Tickets</h2>
								<p>All the current tickets you have in the database</p>
							</Grid>

							{myTickets.length > 0
								? myTickets.map((ticket) => (
										<Grid item xs={12} md={6} lg={4} key={ticket._id}>
											<div className='ticket-card'>
												<h3>Title</h3>
												<p>{ticket.title}</p>

												<h3>Project Name</h3>
												<p>{ticket.projectName}</p>

												<h3>Developer Assigned</h3>
												<p>{ticket.developerAssignedName}</p>

												<h3>Ticket Priority</h3>
												<p>{ticket.priority}</p>

												<h3>Ticket Status</h3>
												<p>{ticket.status}</p>

												<h3>Ticket Type</h3>
												<p>{ticket.type}</p>

												<h3>Created On</h3>
												<p>{ticket.createdAt}</p>

												<div className='ticket-btns'>
													<Link
														to={{
															pathname: '/editticket',
															state: { ticketID: ticket._id },
														}}
														className='btn'
													>
														Edit / Assign
													</Link>

													<Link
														to={{
															pathname: '/ticketdetails',
															state: { ticketID: ticket._id },
														}}
														className='btn'
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
