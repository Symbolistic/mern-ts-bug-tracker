import { Response, Request } from 'express';
import { Notification } from '../models/Notification';
import ReadStatus from '../types/notification';

const getNotifications = async (req: Request, res: Response) => {
	const { userid } = req.params;

	try {
		const notifications = await Notification.find({ userID: userid }).sort({
			createdAt: 'desc',
		});

		const unreadNotifications = await Notification.find({
			userID: userid,
			readStatus: ReadStatus.UNREAD,
		});

		res
			.status(200)
			.json({
				notifications,
				unreadLength: unreadNotifications.length,
				success: true,
			});
	} catch (error) {
		console.log(error);
	}
};

const markRead = async (req: Request, res: Response) => {
	const { id } = req.body;

	try {
		const markedRead = await Notification.findByIdAndUpdate(
			{ _id: id },
			{ readStatus: ReadStatus.READ }
		);
		if (!markedRead) throw new Error('Could not update Read Status!');

		res.status(200).json({ success: true });
	} catch (error) {}
};

const deleteNotification = async (req: Request, res: Response) => {
	const { id } = req.body;

	try {
		const deletdeNotification = await Notification.findByIdAndDelete({
			_id: id,
		});
		if (!deletdeNotification) throw new Error('Could not delete Notification!');

		res.status(200).json({ success: true });
	} catch (error) {}
};

export { getNotifications, markRead, deleteNotification };
