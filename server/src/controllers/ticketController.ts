import { Response, Request } from 'express';
import { Ticket } from '../models/Ticket';
import { TicketInt } from '../types/ticket';
import { User } from '../models/User';
import { ProjectRole } from '../models/ProjectRole';
import { TicketComment } from '../models/TicketComment';
import { TicketCommentInt } from '../types/ticketcomment';

interface MyDetailedError {
	properties: {
		path: string;
		message: string;
	};
}

interface MyError {
	message: string;
	code: number;
	errors: MyDetailedError[];
}

// Handle Errors
const handleErrors = (err: MyError) => {
	console.log(err.message, err.code);

	let errors: { [key: string]: string } = {
		name: '',
		email: '',
		password: '',
		message: '',
	};

	if (err.message === 'Unauthorized!') {
		errors.message = err.message;
	}

	return errors;
};

const addTicket = async (req: Request, res: Response) => {
	const {
		title,
		description,
		projectFrom,
		projectName,
		developerAssigned,
		priority,
		status,
		type,
	} = req.body;

	try {
		const user = await User.findOne({ email: developerAssigned }).select({
			name: 1,
			email: 1,
		});

		if (!user) throw new Error('User not found');

		const ticket: TicketInt = await Ticket.create({
			title,
			description,
			projectFrom,
			projectName,
			developerAssignedID: user._id,
			developerAssignedName: user.name,
			priority,
			status,
			type,
		});
		res.status(200).json({ success: true });
	} catch (error) {
		console.log(error);
	}
};

const getMyTickets = async (req: Request, res: Response) => {
	const { userid } = req.params;

	try {
		const tickets = await Ticket.find({ developerAssignedID: userid });
		res.status(200).json({ tickets, success: true });
	} catch (error) {
		console.log(error);
	}
};

const getTicketDetails = async (req: Request, res: Response) => {
	const { ticketid } = req.params;

	try {
		const ticket = await Ticket.findById({ _id: ticketid });
		if (!ticket) throw new Error('Ticket not found');

		// Grab all the personnel for this tickets project
		const personnel = await ProjectRole.find({
			projectFrom: ticket.projectFrom,
		}).select({
			name: 1,
			email: 1,
			role: 1,
		});

		// Also find the email of the current assigned user for this ticket
		const assignedUserEmail = await ProjectRole.findOne({
			user: ticket.developerAssignedID,
		})
			.select({ _id: 0, email: 1 })
			.distinct('email');

		res.status(200).json({
			ticket,
			personnel,
			assignedUserEmail: assignedUserEmail[0],
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};

const editTicket = async (req: Request, res: Response) => {
	const {
		title,
		description,
		developerAssigned,
		priority,
		status,
		type,
		ticketID,
	} = req.body;

	try {
		// Grab the user info using the developerAssigned variable (it has the users email)
		const user = await User.findOne({ email: developerAssigned });

		if (!user) throw new Error('User not found');
		const ticket = await Ticket.findByIdAndUpdate(
			{ _id: ticketID },
			{
				title,
				description,
				developerAssignedID: user._id,
				developerAssignedName: user.name,
				priority,
				status,
				type,
			}
		);

		res.status(200).json({ success: true });
	} catch (error) {
		console.log(error);
	}
};

const createTicketComment = async (req: Request, res: Response) => {
	const { userID, ticketFrom, comment } = req.body;

	try {
		// Find the user details
		const user = await User.findById({ _id: userID }).select({ name: 1 });
		if (!user) throw new Error('User not found!');

		// Create the ticket comment
		const ticketComment: TicketCommentInt = await TicketComment.create({
			comment,
			ticketFrom,
			commenterID: user._id,
			commenterName: user.name,
		});

		res.status(200).json({ success: true });
	} catch (error) {
		console.log(error);
	}
};

const getTicketComments = async (req: Request, res: Response) => {
	const { ticketid } = req.params;

	try {
		const ticketComments = await TicketComment.find({ ticketFrom: ticketid });
		res.status(200).json({ ticketComments, success: true });
	} catch (error) {
		console.log(error);
	}
};

export {
	addTicket,
	getMyTickets,
	getTicketDetails,
	editTicket,
	createTicketComment,
	getTicketComments,
};
