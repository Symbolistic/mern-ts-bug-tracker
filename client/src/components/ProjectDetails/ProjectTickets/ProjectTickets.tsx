import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ProjectService from '../../Services/ProjectService';
import { useAuthContext } from '../../Context/AuthContext';
import TicketService from '../../Services/TicketService';

interface TicketInt {
	_id: string;
	title: string;
	description: string;
	projectName: string;
	developerAssignedName: string;
	priority: string;
	status: string;
	type: string;
	createdAt: Date;
}

interface PersonnelInt {
	name: string;
	email: string;
	role: string;
}

// Project ID holds the ID for the current Project which is gotten from location.state.project
// Project holds the basic project data which is grabbed from the backend directly
interface Props {
	projectID: string;
	project: { name: string; description: string };
	personnel: PersonnelInt[];
}

export const ProjectTickets: React.FC<Props> = ({
	projectID,
	project,
	personnel,
}) => {
	const [tickets, setTickets] = useState<TicketInt[]>([]);

	// Handle success response messages
	const [message, setMessage] = useState('');

	// Handle error messages
	const [error, setError] = useState('');

	const authContext = useAuthContext();

	useEffect(() => {
		const getProjectTickets = async (projectid: string) => {
			const data = await ProjectService.getProjectTickets(projectid);
			if (data.success) {
				setTickets(data.projectTickets);
			}
		};

		getProjectTickets(projectID);
	}, [projectID]);

	const deleteTicket = async (ticketID: string) => {
		setMessage('');
		setError('');

		const data = {
			userID: authContext.user,
			ticketID,
		};

		try {
			const response = await TicketService.deleteTicket(data);
			if (response.success) {
				// Set the success message
				setMessage(response.message);

				// Now lets update the render by sending a GET Request for my tickets
				const myTicketsResponse = await ProjectService.getProjectTickets(
					projectID
				);

				if (myTicketsResponse.success) {
					setTickets(myTicketsResponse.projectTickets);
				}
			} else {
				console.log(response);
				setError(response.errors.message);
			}
		} catch (error) {
			console.log(error);
			setError(error);
		}
	};

	return (
		<Grid container spacing={2} justify='center' className='project-tickets'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Tickets for this Project</h2>
				<p>List of tickets for this project</p>
				<Link
					className='btn'
					to={{
						pathname: '/addticket',
						state: { project: project, personnel: personnel },
					}}
				>
					Add Ticket
				</Link>
			</Grid>

			<Grid container justify='center' spacing={2}>
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
				{tickets?.length > 0
					? tickets.map((ticket) => (
							<Grid item xs={12} md={6} lg={4} key={ticket._id}>
								<div className='ticket-card'>
									<button
										className='btn-close'
										onClick={() => deleteTicket(ticket._id)}
									>
										X
									</button>
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
												pathname: '/ticketdetails',
												state: { ticketID: ticket._id },
											}}
											className='btn'
										>
											More Details
										</Link>
									</div>
								</div>
							</Grid>
					  ))
					: ''}
			</Grid>
		</Grid>
	);
};
