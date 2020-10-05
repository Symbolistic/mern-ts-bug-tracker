import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TicketService from '../Services/TicketService';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

interface PersonnelInt {
	_id: string;
	name: string;
	email: string;
	role: string;
}

interface MyLocationState {
	project: { _id: string; name: string; description: string };
	personnel: PersonnelInt[];
}

interface Props extends RouteComponentProps<any, any, MyLocationState> {}

export const AddTicket: React.FC<Props> = () => {
	// This will handle the location and passed down state using the useLocation hook
	const location = useLocation<MyLocationState>();

	// This handles history.goBack()
	const history = useHistory();

	const [ticketData, setTicketData] = useState({
		title: '',
		description: '',
		developerAssigned: location.state.personnel[0].email.toString(),
		priority: 'Low',
		status: 'New',
		type: 'Bugs/Errors',
	});

	// Function to Add the tickets
	const addTicket = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = {
			...ticketData,
			projectFrom: location.state.project._id,
			projectName: location.state.project.name,
		};

		const response = await TicketService.addTicket(data);

		if (response.success) {
			history.goBack();
		}
	};

	return (
		<div id='AddTicket'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={2} alignItems='center'>
							<Grid item xs={12} md={12} lg={12} className='header'>
								<h2>Add Ticket</h2>
								<p>Add a Ticket to this Project</p>

								<Grid container spacing={2} className='ticket-info'>
									<Grid item xs={6} md={6} lg={6}>
										<h3>Ticket Title</h3>
										<p>{location.state.project.name}</p>
									</Grid>

									<Grid item xs={6} md={6} lg={6}>
										<h3>Ticket Description</h3>
										<p>{location.state.project.description}</p>
									</Grid>
								</Grid>
							</Grid>
							<form onSubmit={addTicket}>
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
											{location.state.personnel.length > 0
												? location.state.personnel.map((user) => (
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
