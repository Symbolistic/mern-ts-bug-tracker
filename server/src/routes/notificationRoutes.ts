import { Router } from 'express';
import {
	getNotifications,
	markRead,
	deleteNotification,
} from '../controllers/notificationController';

const router = Router();

router.get('/getnotifications/:userid', getNotifications);
router.post('/markread', markRead);
router.post('/deletenotification', deleteNotification);

export default router;
