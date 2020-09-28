import React from 'react';
import Grid from '@material-ui/core/Grid';

interface Props {}

export const TicketComments: React.FC<Props> = () => {
	return (
		<Grid container spacing={2} justify='center' className='ticket-comments'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Ticket Comments</h2>
				<p>All comments for this ticket</p>
				<form>
					<input placeholder='Add a comment' />
					<button>Submit</button>
				</form>
			</Grid>

			<Grid container justify='center' spacing={1}>
				<Grid item xs={6} md={6} lg={4}>
					<div className='comment-card'>
						<Grid item xs={12} md={12} lg={12}>
							<h3>Commenter</h3>
							<p>Chef Ramsay</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Message</h3>
							<p>YOU'RE AN IDIOT SANDWICH! SAY IT NOW!!!</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Created</h3>
							<p>09/26/2020 06:00PM</p>
						</Grid>
					</div>
				</Grid>

				<Grid item xs={6} md={6} lg={4}>
					<div className='comment-card'>
						<Grid item xs={12} md={12} lg={12}>
							<h3>Commenter</h3>
							<p>Chef Ramsay</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Message</h3>
							<p>YOU'RE AN IDIOT SANDWICH! SAY IT NOW!!!</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Created</h3>
							<p>09/26/2020 06:00PM</p>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
};
