import React from 'react';
import { DropdownItem } from './DropdownItem';

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
	notifications: NotificationsInt[];
	setNotifications: React.Dispatch<React.SetStateAction<NotificationsInt[]>>;
	setUnread: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const Dropdown: React.FC<Props> = ({
	notifications,
	setNotifications,
	setUnread,
}) => {
	return (
		<div className='dropdown'>
			{notifications.length > 0 &&
				notifications.map((notification) => (
					<DropdownItem
						key={notification._id}
						readStatus={notification.readStatus}
						id={notification._id}
						setNotifications={setNotifications}
						setUnread={setUnread}
					>
						{notification.message}
					</DropdownItem>
				))}
		</div>
	);
};
