import React, { useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';
import { useAuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { Dropdown } from './Dropdown';
import NotificationService from '../Services/NotificationService';
import { useLocation } from 'react-router-dom';

interface NotificationsInt {
	_id: string;

	message: string;

	// The Project ID this notification is for
	projectFrom: string;

	// User's ID this notification is being sent to
	userID: string;

	readStatus: string;
}

interface Props {}

export const Navbar: React.FC<Props> = () => {
	// This handles the notification menu
	const [open, setOpen] = useState(false);

	// This holds all then notifications we will gather from the backend database
	const [notifications, setNotifications] = useState<NotificationsInt[]>([]);

	// This keeps track of the number of unread messages/notifications
	const [unread, setUnread] = useState<number | undefined>();

	// We will keep track of the user ID with this
	const authContext = useAuthContext();

	/* This will handle the location and we will use this as a dependency to check for new notifications
	on each new page load */
	const location = useLocation();

	// This is the function that sends a GET Request for the notifications
	const getNotifications = async (id: string) => {
		const response = await NotificationService.getNotifications(id);

		if (response.success) {
			setNotifications(response.notifications);
			setUnread(response.unreadLength);
		}
	};

	useEffect(() => {
		getNotifications(authContext.user);
	}, [authContext.user, location.pathname]);

	// Handles the logout functionality
	const onClickLogoutHandler = () => {
		AuthService.logout().then((data) => {
			if (!data.isAuthenticated) {
				authContext.setUser('');
				authContext.setIsAuthenticated(false);
			}
		});
	};

	return (
		<header>
			<Container maxWidth={false} className='header-nav'>
				<div className='logo'></div>
				<label htmlFor='hamburger'>
					<i className='fas fa-bars'></i>
				</label>
				<input type='checkbox' id='hamburger' />

				<div className='side-nav'>
					<Link to='/'>
						<li className='nav-item nav-link'>Dashboard Home</li>
					</Link>

					<Link to='/myprojects'>
						<li className='nav-item nav-link'>My Projects</li>
					</Link>

					<Link to='/mytickets'>
						{' '}
						{/* This handles the logout, add onClick here */}
						<li className='nav-item nav-link'>My Tickets</li>
					</Link>

					<Link to='/'>
						<li className='nav-item nav-link'>User Profile</li>
					</Link>
				</div>

				<div className='nav'>
					<li className='nav-item nav-link' onClick={() => setOpen(!open)}>
						Notifications <span className='unread-icon'>{unread}</span>
					</li>

					{open && (
						<Dropdown
							notifications={notifications}
							setNotifications={setNotifications}
							setUnread={setUnread}
						/>
					)}

					<Link to='/login' onClick={onClickLogoutHandler}>
						<li className='nav-item nav-link'>Logout</li>
					</Link>
				</div>
			</Container>
		</header>
	);
};
