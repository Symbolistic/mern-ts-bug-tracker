import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TicketService from '../Services/TicketService';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

interface PersonnelInt {
	name: string;
	email: string;
	role: string;
}

interface MyLocationState {
	ticketID: string;
}

interface Props extends RouteComponentProps<any, any, MyLocationState> {}

export const EditTicket: React.FC<Props> = () => {
	// This will handle the location and passed down state using the useLocation hook
	const location = useLocation<MyLocationState>();

	// Handles the history.push
	const history = useHistory();

	// Personnel for current Project
	const [personnel, setPersonnel] = useState<PersonnelInt[]>([]);

	// Current Ticket Info
	const [ticketInfo, setTicketInfo] = useState({ title: '', description: '' });

	// This keeps track of the new ticket info we will use to edit the existing ticket
	const [ticketData, setTicketData] = useState({
		title: '',
		description: '',
		developerAssigned: '',
		priority: 'Low',
		status: 'New',
		type: 'Bugs/Errors',
	});

	useEffect(() => {
		const grabTicketDetails = async (id: string) => {
			const response = await TicketService.getTicketDetails(id);
			if (response.success) {
				console.log(response);

				setPersonnel(response.personnel);

				setTicketInfo({
					title: response.ticket.title,
					description: response.ticket.description,
				});

				setTicketData({
					title: response.ticket.title,
					description: response.ticket.description,
					developerAssigned: response.assignedUserEmail,
					priority: response.ticket.priority,
					status: response.ticket.status,
					type: response.ticket.type,
				});
			}
		};
		grabTicketDetails(location.state.ticketID);
	}, [location.state.ticketID]);

	// Function to edit the ticket
	const editTicket = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = {
			...ticketData,
			ticketID: location.state.ticketID,
		};

		const response = await TicketService.editTicket(data);

		if (response.success) {
			history.push('/mytickets');
		}
	};

	return (
		<div id='EditTicket'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={2} alignItems='center'>
							<Grid item xs={12} md={12} lg={12} className='header'>
								<h2>Edit Ticket</h2>
								<p>Edit ticket details</p>

								<Grid container spacing={2} className='ticket-info'>
									<Grid item xs={6} md={6} lg={6}>
										<h3>Ticket Title</h3>
										<p>{ticketInfo.title}</p>
									</Grid>

									<Grid item xs={6} md={6} lg={6}>
										<h3>Ticket Description</h3>
										<p>{ticketInfo.description}</p>
									</Grid>
								</Grid>
							</Grid>
							<form onSubmit={editTicket}>
								<Grid container spacing={2}>
									<Grid item xs={12} md={6} lg={6}>
										<h3>Ticket Title</h3>
										<input
											onChange={(e) =>
												setTicketData({ ...ticketData, title: e.target.value })
											}
											value={ticketData.title}
											required={true}
										/>
									</Grid>
									<Grid item xs={12} md={6} lg={6}>
										<h3>Ticket Description</h3>
										<input
											onChange={(e) =>
												setTicketData({
													...ticketData,
													description: e.target.value,
												})
											}
											value={ticketData.description}
											required={true}
										/>
									</Grid>
									<Grid item xs={12} md={6} lg={6}>
										<h3>Assign Developer</h3>
										<select
											onChange={(e) =>
												setTicketData({
													...ticketData,
													developerAssigned: e.target.value,
												})
											}
											value={ticketData.developerAssigned}
										>
											{personnel.length > 0
												? personnel.map((user) => (
														<option key={user.email} value={user.email}>
															{user.name}
														</option>
												  ))
												: ''}
										</select>
									</Grid>

									<Grid item xs={12} md={6} lg={6}>
										<h3>Ticket Priority</h3>
										<select
											onChange={(e) =>
												setTicketData({
													...ticketData,
													priority: e.target.value,
												})
											}
											value={ticketData.priority}
										>
											<option value='Low'>Low</option>
											<option value='Medium'>Medium</option>
											<option value='High'>High</option>
										</select>
									</Grid>
									<Grid item xs={12} md={6} lg={6}>
										<h3>Ticket Status</h3>
										<select
											onChange={(e) =>
												setTicketData({ ...ticketData, status: e.target.value })
											}
											value={ticketData.status}
										>
											<option value='New'>New</option>
											<option value='Open'>Open</option>
											<option value='In_Progress'>In_Progress</option>
											<option value='Resolved'>Resolved</option>
											<option value='Additional_Info_Required'>
												Additional_Info_Required
											</option>
										</select>
									</Grid>

									<Grid item xs={12} md={6} lg={6}>
										<h3>Ticket Type</h3>
										<select
											onChange={(e) =>
												setTicketData({ ...ticketData, type: e.target.value })
											}
											value={ticketData.type}
										>
											<option value='Bugs/Errors'>Bugs/Errors</option>
											<option value='Feature_Request'>Feature_Request</option>
											<option value='Other_Comments'>Other_Comments</option>
											<option value='Training/Document_Requests'>
												Training/Document_Requests
											</option>
										</select>
									</Grid>
									<Grid item xs={12} md={6} lg={6}>
										<button>Submit</button>
									</Grid>
								</Grid>
							</form>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
