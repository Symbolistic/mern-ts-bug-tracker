import React from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

type Props = {
	hide: boolean;
	setHide: (hidden: boolean) => void;
};

export const TicketModal: React.FC<Props> = ({ hide, setHide }) => {
	return (
		<div id='TicketModal' className={hide ? 'hide' : ''}>
			<button onClick={() => setHide(true)}>X</button>
			<Container>
				<h2 className='category'>Create New Project</h2>
				<Grid container spacing={2} alignItems='center' justify='center'>
					<Grid item xs={12} md={12} className='item'>
						<h4>Project Name</h4>
						<p>$35.00</p>
					</Grid>
					<Grid item xs={12} md={12} className='item'>
						<h4>Description</h4>
						<p>$25.00</p>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};
