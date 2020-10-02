import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TicketService from '../../Services/TicketService';
import { useAuthContext } from '../../Context/AuthContext';

// Interface for Ticket Comments
interface TicketCommentInt extends Document {
	_id: string;
	comment: string;

	// The Ticket ID this comment is for
	ticketFrom: string;

	// User's ID
	commenterID: string;
	commenterName: string;
	createdAt: Date;
}

interface Props {
	ticketID: string;
}

export const TicketComments: React.FC<Props> = ({ ticketID }) => {
	// This holds all the ticket comments from the database
	const [ticketComments, setTicketComments] = useState<TicketCommentInt[]>([]);

	// This will hold the comment INPUT value
	const [comment, setComment] = useState('');

	// This will get me the ID of the logged in user
	const authContext = useAuthContext();

	// This function will get the ticket comments from the database
	const getTicketComments = async (id: string) => {
		const response = await TicketService.getTicketComments(id);
		if (response.success) {
			setTicketComments(response.ticketComments);
		}
	};

	useEffect(() => {
		getTicketComments(ticketID);
	}, [ticketID]);

	// This function will be used to create the comment
	const createTicketComment = async (
		event: React.ChangeEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		const data = {
			userID: authContext.user,
			ticketFrom: ticketID,
			comment: comment,
		};

		const response = await TicketService.createTicketComment(data);

		if (response.success) {
			getTicketComments(ticketID);
		}
	};

	return (
		<Grid container spacing={2} justify='center' className='ticket-comments'>
			<Grid item xs={12} md={12} lg={12} className='header'>
				<h2>Ticket Comments</h2>
				<p>All comments for this ticket</p>
				<form onSubmit={createTicketComment}>
					<input
						placeholder='Add a comment'
						onChange={(e) => setComment(e.target.value)}
						value={comment}
					/>
					<button>Submit</button>
				</form>
			</Grid>

			<Grid container justify='center' spacing={1}>
				{ticketComments.length > 0
					? ticketComments.map((comment) => (
							<Grid item xs={12} md={6} lg={4} key={comment._id}>
								<div className='comment-card'>
									<Grid item xs={12} md={12} lg={12}>
										<h3>Commenter</h3>
										<p>{comment.commenterName}</p>
									</Grid>

									<Grid item xs={12} md={12} lg={12}>
										<h3>Message</h3>
										<p>{comment.comment}</p>
									</Grid>

									<Grid item xs={12} md={12} lg={12}>
										<h3>Created</h3>
										<p>{comment.createdAt}</p>
									</Grid>
								</div>
							</Grid>
					  ))
					: ''}
			</Grid>
		</Grid>
	);
};
