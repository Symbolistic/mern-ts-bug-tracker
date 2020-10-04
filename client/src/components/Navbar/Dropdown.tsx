import React from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

interface Props {}

export const Dropdown: React.FC<Props> = () => {
	function DropdownItem(props: any) {
		return (
			<div>
				<div className='menu-item'>
					{props.children}
					<i className='fas fa-trash'></i>
				</div>
				<p className='mark-read'>Mark as Read</p>
			</div>
		);
	}

	return (
		<div className='dropdown'>
			<DropdownItem>
				<span>
					My Item 1 IS HERE I AM CHECKING DUCK QUACK QUACK WHAT AM I SAYING
				</span>
			</DropdownItem>
			<DropdownItem>My Item 2</DropdownItem>
		</div>
	);
};
