import React from 'react';
import Grid from '@material-ui/core/Grid';

interface Props {}

export const TicketHistory: React.FC<Props> = () => {
	return (
		<Grid container spacing={2} justify='center' className='ticket-history'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Ticket History</h2>
				<p>All history information for this ticket</p>
			</Grid>

			<Grid container justify='center' spacing={2}>
				<Grid item xs={6} md={6} lg={6}>
					<div className='history-card'>
						<Grid item xs={12} md={12} lg={12}>
							<h3>Property</h3>
							<p>Assigned to User ID</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Old Value</h3>
							<p>Chef Ramsay</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>New Value</h3>
							<p>The Space Duck</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Date Changed</h3>
							<p>09/26/2020 07:14PM</p>
						</Grid>
					</div>
				</Grid>

				<Grid item xs={6} md={6} lg={6}>
					<div className='history-card'>
						<Grid item xs={12} md={12} lg={12}>
							<h3>Property</h3>
							<p>Assigned to User ID</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Old Value</h3>
							<p>Chef Ramsay</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>New Value</h3>
							<p>The Space Duck</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Date Changed</h3>
							<p>09/26/2020 07:14PM</p>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
};
