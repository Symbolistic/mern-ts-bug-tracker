import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

interface ITickets extends RouteComponentProps<any> {}

export const MyTickets: React.FC<ITickets> = (props) => {
	const handleTicketDetails = (event: any) => {
		event.preventDefault();

		props.history.push('/ticketdetails');
	};

	const handleEditTicket = (event: any) => {
		event.preventDefault();

		props.history.push('/editticket');
	};

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

							<Grid item xs={12} md={6} lg={4}>
								<div className='ticket-card'>
									<h3>Title</h3>
									<p>Sample Title</p>

									<h3>Project Name</h3>
									<p>Sample Name</p>

									<h3>Developer Assigned</h3>
									<p>Symbol</p>

									<h3>Ticket Priority</h3>
									<p>Medium</p>

									<h3>Ticket Status</h3>
									<p>Open</p>

									<h3>Ticket Type</h3>
									<p>Bugs/Errors</p>

									<h3>Created On</h3>
									<p>09/26/2020 05:00AM</p>

									<div className='ticket-btns'>
										<button onClick={handleEditTicket}>Edit / Assign</button>
										<button onClick={handleTicketDetails}>Details</button>
									</div>
								</div>
							</Grid>

							<Grid item xs={12} md={6} lg={4}>
								<div className='ticket-card'>
									<h3>Title</h3>
									<p>WE NEED LAMB SAUCE</p>

									<h3>Project Name</h3>
									<p>ITS RAW!!!!!</p>

									<h3>Developer Assigned</h3>
									<p>Chef Ramsay</p>

									<h3>Ticket Priority</h3>
									<p>High</p>

									<h3>Ticket Status</h3>
									<p>Open</p>

									<h3>Ticket Type</h3>
									<p>Bugs/Errors</p>

									<h3>Created On</h3>
									<p>09/26/2020 05:00AM</p>

									<div className='ticket-btns'>
										<button>Edit / Assign</button>
										<button>Details</button>
									</div>
								</div>
							</Grid>

							<Grid item xs={12} md={6} lg={4}>
								<div className='ticket-card'>
									<h3>Title</h3>
									<p>Sample Title</p>

									<h3>Project Name</h3>
									<p>Sample Name</p>

									<h3>Developer Assigned</h3>
									<p>Symbol</p>

									<h3>Ticket Priority</h3>
									<p>Medium</p>

									<h3>Ticket Status</h3>
									<p>Open</p>

									<h3>Ticket Type</h3>
									<p>Bugs/Errors</p>

									<h3>Created On</h3>
									<p>09/26/2020 05:00AM</p>

									<div className='ticket-btns'>
										<button>Edit / Assign</button>
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
