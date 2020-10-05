import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TicketService from '../../Services/TicketService';
import { useAuthContext } from '../../Context/AuthContext';

// Interface for Ticket Comments
interface TicketCommentInt {
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
	// Handle success response messages
	const [message, setMessage] = useState('');

	// Handle error messages
	const [error, setError] = useState('');

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

	const deleteTicketComment = async (commentID: string) => {
		setMessage('');
		setError('');

		const data = {
			userID: authContext.user,
			ticketID,
			commentID,
		};

		try {
			const response = await TicketService.deleteComment(data);
			if (response.success) {
				// Set the success message
				setMessage(response.message);

				// Now lets update the render by sending a GET Request for my tickets
				getTicketComments(ticketID);
			} else {
				setError(response.errors.message);
			}
		} catch (error) {
			console.log(error);
			setError(error);
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
						maxLength={200}
					/>
					<button className='btn'>Submit</button>
				</form>
			</Grid>

			<Grid container justify='center' spacing={1}>
				{error && (
					<Grid item xs={12} md={12} lg={12}>
						<h3 className='error'>{error}</h3>
					</Grid>
				)}
				{message && (
					<Grid item xs={12} md={12} lg={12}>
						<h3 className='message'>{message}</h3>
					</Grid>
				)}

				{ticketComments.length > 0
					? ticketComments.map((comment) => (
							<Grid item xs={12} md={6} lg={4} key={comment._id}>
								<div className='comment-card'>
									<button
										className='btn-close'
										onClick={() => deleteTicketComment(comment._id)}
									>
										X
									</button>
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
