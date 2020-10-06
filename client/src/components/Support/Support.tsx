import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container, TextField } from '@material-ui/core';
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
									Use this page to contact support or to send a message directly
								</p>
							</Grid>
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<h3>Contact:</h3>
							<form>
								<TextField label='Name' />
								<br />
								<br />

								<TextField label='Email' />
								<br />
								<br />

								<TextField
									id='outlined-multiline-static'
									multiline
									rows={10}
									placeholder='Enter your message here'
									variant='outlined'
									label='Message'
									size='medium'
									style={{ width: 260, marginLeft: '-5px' }}
								/>

								<br />
								<br />
								<button className='btn'>Submit</button>
							</form>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
