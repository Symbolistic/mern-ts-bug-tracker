import { Router } from 'express';
import {
	addTicket,
	editTicket,
	getMyTickets,
	getTicketDetails,
	createTicketComment,
	getTicketComments,
	getTicketHistory,
	uploadTicketAttachment,
	getTicketAttachments,
	deleteTicket,
	deleteTicketComment,
	deleteTicketAttachment,
} from '../controllers/ticketController';

const router = Router();

router.post('/addticket', addTicket);
router.get('/mytickets/:userid', getMyTickets);
router.get('/getticketdetails/:ticketid', getTicketDetails);
router.post('/editticket', editTicket);
router.post('/deleteticket', deleteTicket);
router.post('/deletecomment', deleteTicketComment);
router.post('/deleteattachment', deleteTicketAttachment);

// Ticket Comments
router.post('/createticketcomment', createTicketComment);
router.get('/getticketcomments/:ticketid', getTicketComments);

// Ticket History
router.get('/gettickethistory/:ticketid', getTicketHistory);

// Ticket Attachments
router.post('/uploadticketattachment', uploadTicketAttachment);
router.get('/getticketattachments/:ticketid', getTicketAttachments);

export default router;
