import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { DoughnutChart } from '../Charts/DoughnutChart';

interface Props {}

export const Dashboard: React.FC<Props> = () => {
	return (
		<div id='Dashboard'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={4} alignItems='center' justify='center'>
							<Grid item xs={12} md={6} lg={4}>
								<div className='chart-card'>
									<div className='chart'>Chart will be here</div>
									<h3>Blablabla</h3>
								</div>
							</Grid>

							<Grid item xs={12} md={6} lg={4}>
								<div className='chart-card'>
									<div className='chart'>Chart will be here</div>
									<h3>Blablabla</h3>
								</div>
							</Grid>

							<Grid item xs={12} md={6} lg={4}>
								<div className='chart-card'>
									<div className='chart'>Chart will be here</div>
									<h3>Blablabla</h3>
								</div>
							</Grid>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
