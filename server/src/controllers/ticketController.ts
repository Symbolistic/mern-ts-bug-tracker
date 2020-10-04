import { Response, Request } from 'express';
import { Ticket } from '../models/Ticket';
import { TicketInt } from '../types/ticket';
import { User } from '../models/User';
import { ProjectRole } from '../models/ProjectRole';
import { TicketComment } from '../models/TicketComment';
import { TicketCommentInt } from '../types/ticketcomment';
import { TicketHistory } from '../models/TicketHistory';
import cloudinary from '../utils/cloudinary';
import { TicketAttachment } from '../models/TicketAttachment';

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

const escapeSpecialChars = function (str: string) {
	return str.replace(/","/g, '"\n"');
};

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

		// This will update the old ticket and return the old ticket values for us to use.
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

		// If we couldn't create a ticket, throw an error
		if (!ticket) throw new Error('Could not create ticket');

		// THIS IS WHERE I BEGIN ADDING THE TICKET CHANGE TO THE TICKET HISTORY
		// Here I manually create the new ticket object so I can compare this to the old ticket object later
		const newTicket: { [key: string]: string } = {
			title,
			description,
			developerAssignedID: user._id,
			developerAssignedName: user.name,
			priority,
			status,
			type,
			_id: ticketID,
		};

		/* So here I create a copy of the returned document ticket and covert it to an actual object 
		so TypeScript would stop yelling at me, now I will compare oldTicket and newTicket to find
		the different values and delete everything else so I have the old and new values only */
		const oldTicket: { [key: string]: string } = ticket.toObject();

		// Now we will modify the returned ticket document
		Object.entries(oldTicket).forEach(([key, value]) => {
			if (!newTicket[key] || !oldTicket) {
				delete newTicket[key];
				delete oldTicket[key];
			} else {
				if (newTicket[key].toString() === oldTicket[key].toString()) {
					delete newTicket[key];
					delete oldTicket[key];
				}
			}
		});

		// Finally this is where the Ticket History is created for this change
		// We check if there was a change, if there was, then we add to the history
		if (!oldTicket || !newTicket) {
			res.status(200).json({ success: true });
		} else {
			const ticketHistory = await TicketHistory.create({
				ticketFrom: ticketID,
				userFrom: user._id,
				userName: user.name,
				action: 'Updated Ticket Details',
				oldValue: escapeSpecialChars(JSON.stringify(oldTicket)), // Stringify + New Line for each Object
				newValue: escapeSpecialChars(JSON.stringify(newTicket)), // Stringify + New Line for each Object
			});
			res.status(200).json({ success: true });
		}
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

const getTicketHistory = async (req: Request, res: Response) => {
	const { ticketid } = req.params;

	try {
		const ticketHistory = await TicketHistory.find({ ticketFrom: ticketid });
		res.status(200).json({ ticketHistory, success: true });
	} catch (error) {
		console.log(error);
	}
};

const uploadTicketAttachment = async (req: Request, res: Response) => {
	try {
		// Grabs the Base64 Image Encoding
		const fileStr = req.body.data;

		// This is the needed User and Ticket Data I will use for the database storage of the info
		const { userID, ticketID, notes, fileName } = req.body;

		// Check and make sure we find the logged in user
		const user = await User.findById({ _id: userID });
		if (!user) throw new Error('User not found. Access Denied!');

		// This is where we upload to cloudinary
		const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: 'bug_tracker',
		});

		// Make sure the uploaded response was successful
		if (!uploadedResponse) throw new Error('Upload Failed');

		const attachment = TicketAttachment.create({
			fileName,
			notes,
			ticketFrom: ticketID,
			userID: user._id,
			userName: user.name,
			fileSrc: uploadedResponse.secure_url,
		});
		res.json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ Error: error.message });
	}
};

const getTicketAttachments = async (req: Request, res: Response) => {
	const { ticketid } = req.params;

	try {
		const ticketAttachments = await TicketAttachment.find({
			ticketFrom: ticketid,
		});
		res.status(200).json({ ticketAttachments, success: true });
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
	getTicketHistory,
	uploadTicketAttachment,
	getTicketAttachments,
};
