import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

interface Props {}

export const ProjectTickets: React.FC<Props> = () => {
	return (
		<Grid container spacing={2} justify='center' className='project-tickets'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Tickets for this Project</h2>
				<p>List of tickets for this project</p>
				<Link className='btn' to='/addticket'>
					Add Ticket
				</Link>
			</Grid>

			<Grid container justify='center' spacing={2}>
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
							<button>More Details</button>
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
							<button>More Details</button>
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
							<button>More Details</button>
						</div>
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
};
