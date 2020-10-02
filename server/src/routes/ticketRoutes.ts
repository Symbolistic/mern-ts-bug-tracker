import { Router } from 'express';
import {
	addTicket,
	editTicket,
	getMyTickets,
	getTicketDetails,
	createTicketComment,
	getTicketComments,
} from '../controllers/ticketController';

const router = Router();

router.post('/addticket', addTicket);
router.get('/mytickets/:userid', getMyTickets);
router.get('/getticketdetails/:ticketid', getTicketDetails);
router.post('/editticket', editTicket);
router.post('/createticketcomment', createTicketComment);
router.get('/getticketcomments/:ticketid', getTicketComments);

export default router;
