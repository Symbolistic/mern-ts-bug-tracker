import React from 'react';
import Grid from '@material-ui/core/Grid';

interface Props {}

export const TicketAttachments: React.FC<Props> = () => {
	return (
		<Grid container spacing={2} justify='center' className='ticket-attachments'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Attachment History</h2>
				<p>All files attached to this ticket</p>
			</Grid>

			<Grid container justify='center' spacing={2}>
				<Grid item xs={6} md={6} lg={6}>
					<div className='attachment-card'>
						<Grid item xs={12} md={12} lg={12}>
							<h3>File</h3>
							<p>RandomDuck.svg</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Uploader</h3>
							<p>Chef Ramsay</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Notes</h3>
							<p>The Space Duck</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Created</h3>
							<p>09/26/2020 07:32PM</p>
						</Grid>
					</div>
				</Grid>

				<Grid item xs={6} md={6} lg={6}>
					<div className='attachment-card'>
						<Grid item xs={12} md={12} lg={12}>
							<h3>File</h3>
							<p>RandomDuck.svg</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Uploader</h3>
							<p>Chef Ramsay</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Notes</h3>
							<p>The Space Duck</p>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Created</h3>
							<p>09/26/2020 07:32PM</p>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
};
