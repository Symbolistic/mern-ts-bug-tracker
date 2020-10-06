import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

interface Props {}

export const Support: React.FC<Props> = () => {
	return (
		<div id='Support'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={4} justify='center'>
							<Grid item xs={12} md={12} lg={12} className='header'>
								<h2>Support</h2>
								<p>
									Use this page to contact support or to send us a message
									directly
								</p>
							</Grid>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Still being worked on...</h3>
							<p>Come back another time</p>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
