import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

export const Sidebar: React.FC<Props> = () => {
	return (
		<div id='Sidebar'>
			<div className='nav'>
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

				<Link to='/support'>
					<li className='nav-item nav-link'>Support</li>
				</Link>
			</div>
		</div>
	);
};
