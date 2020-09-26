import React from 'react';
import AuthService from '../Services/AuthService';
import { useAuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';

interface Props {}

export const Navbar: React.FC<Props> = () => {
	const authContext = useAuthContext();

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

					<Link to='/budget'>
						<li className='nav-item nav-link'>User Profile</li>
					</Link>
				</div>

				<div className='nav'>
					<Link to='/budget'>
						<li className='nav-item nav-link'>Notifications</li>
					</Link>

					<Link to='/login' onClick={onClickLogoutHandler}>
						<li className='nav-item nav-link'>Logout</li>
					</Link>
				</div>
			</Container>
		</header>
	);
};
