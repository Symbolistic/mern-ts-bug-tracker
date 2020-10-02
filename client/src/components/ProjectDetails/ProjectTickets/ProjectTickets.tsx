import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ProjectService from '../../Services/ProjectService';

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

	useEffect(() => {
		const getProjectTickets = async (projectid: string) => {
			const data = await ProjectService.getProjectTickets(projectid);
			if (data.success) {
				setTickets(data.projectTickets);
			}
		};

		getProjectTickets(projectID);
	}, [projectID]);

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
				{tickets?.length > 0
					? tickets.map((ticket) => (
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
										<button>More Details</button>
									</div>
								</div>
							</Grid>
					  ))
					: ''}
			</Grid>
		</Grid>
	);
};
