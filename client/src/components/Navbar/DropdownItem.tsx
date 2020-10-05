import React from 'react';
import Grid from '@material-ui/core/Grid';
import NotificationService from '../Services/NotificationService';
import { useAuthContext } from '../Context/AuthContext';

interface NotificationsInt {
	_id: string;

	message: string;

	// The Project ID this notification is for
	projectFrom: string;

	// User's ID this notification is being sent to
	userID: string;

	readStatus: string;
}

interface Props {
	id: string;
	readStatus: string;
	setNotifications: React.Dispatch<React.SetStateAction<NotificationsInt[]>>;
	setUnread: React.Dispatch<React.SetStateAction<number | undefined>>;
}

// This Component handles all the notification messages in the dropdown menu
export const DropdownItem: React.FC<Props> = (props) => {
	// We will keep track of the user ID with this
	const authContext = useAuthContext();

	// This is the function that sends a GET Request for the notifications
	const getNotifications = async (id: string) => {
		const response = await NotificationService.getNotifications(id);

		if (response.success) {
			props.setNotifications(response.notifications);
			props.setUnread(response.unreadLength);
		}
	};

	const markRead = async (id: string, readStatus: string) => {
		if (readStatus === 'UNREAD') {
			const response = await NotificationService.markRead({ id });

			if (response.success) {
				getNotifications(authContext.user);
			}
		}
	};

	const deleteNotification = async (id: string) => {
		const response = await NotificationService.deleteNotification({ id });

		if (response.success) {
			getNotifications(authContext.user);
		}
	};

	return (
		<div>
			<Grid container alignItems='center' justify='space-between'>
				<Grid
					item
					xs={10}
					md={10}
					className={
						props.readStatus === 'UNREAD' ? 'notes unread' : 'notes read'
					}
				>
					{props.children}
				</Grid>
				<Grid item xs={2} md={2} className='delete'>
					<i
						className='fas fa-trash'
						onClick={() => deleteNotification(props.id)}
					></i>
				</Grid>
				<Grid item xs={12} md={12}>
					<p
						className='mark-read'
						onClick={() => markRead(props.id, props.readStatus)}
					>
						Mark as Read
					</p>
				</Grid>
			</Grid>
		</div>
	);
};
