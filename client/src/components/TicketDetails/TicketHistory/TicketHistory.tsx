import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TicketService from '../../Services/TicketService';

// Interface for Ticket Comments
interface TicketHistoryInt {
	_id: string;

	// The Ticket ID this comment is for
	ticketFrom: string;

	// User's ID
	userFrom: string;
	userName: string;

	// Action is basically what change was made
	action: string;

	oldValue: string;
	newValue: string;

	createdAt: Date;
}

interface Props {
	ticketID: string;
}

export const TicketHistory: React.FC<Props> = ({ ticketID }) => {
	// This holds all the ticket comments from the database
	const [ticketHistory, setTicketHistory] = useState<TicketHistoryInt[]>([]);

	useEffect(() => {
		// This function will get the ticket history from the database
		const getTicketHistory = async (id: string) => {
			const response = await TicketService.getTicketHistory(id);
			if (response.success) {
				setTicketHistory(response.ticketHistory);
			}
		};

		getTicketHistory(ticketID);
	}, [ticketID]);

	return (
		<Grid container spacing={2} justify='center' className='ticket-history'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Ticket History</h2>
				<p>All history information for this ticket</p>
			</Grid>

			<Grid container justify='center' spacing={2}>
				{ticketHistory.length > 0
					? ticketHistory.map((history) => (
							<Grid item xs={12} md={6} lg={6} key={history._id}>
								<div className='history-card'>
									<Grid item xs={12} md={12} lg={12}>
										<h3>Action</h3>
										<p>{history.action}</p>
									</Grid>

									<Grid item xs={12} md={12} lg={12}>
										<h3>Change made by:</h3>
										<p>{history.userName}</p>
									</Grid>

									<Grid item xs={12} md={12} lg={12}>
										<h3>Old Value</h3>
										<p>{history.oldValue}</p>
									</Grid>

									<Grid item xs={12} md={12} lg={12}>
										<h3>New Value</h3>
										<p>{history.newValue}</p>
									</Grid>

									<Grid item xs={12} md={12} lg={12}>
										<h3>Date Changed</h3>
										<p>{history.createdAt}</p>
									</Grid>
								</div>
							</Grid>
					  ))
					: ''}
			</Grid>
		</Grid>
	);
};
