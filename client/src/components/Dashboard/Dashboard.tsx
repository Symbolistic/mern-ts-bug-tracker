import React, { useEffect, useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { DoughnutChart } from '../Charts/DoughnutChart';
import { BarChart } from '../Charts/BarChart';
import { PieChart } from '../Charts/PieChart';
import TicketService from '../Services/TicketService';
import { useAuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

interface Props {}

export const Dashboard: React.FC<Props> = () => {
	// Hold ticket data
	const [ticketData, setTicketData] = useState({
		priority: {
			low: 0,
			medium: 0,
			high: 0,
		},
		status: {
			new: 0,
			open: 0,
			inProgress: 0,
			resolved: 0,
			additionalInfoReq: 0,
		},
		type: {
			bugsError: 0,
			featureReq: 0,
			other: 0,
			training: 0,
		},
	});
	const authContext = useAuthContext();

	const getChartData = async (userid: string) => {
		try {
			const response = await TicketService.getChartData(userid);

			if (response.success) {
				setTicketData(response.tickets);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (authContext.user) {
			getChartData(authContext.user);
		}
	}, [authContext.user]);

	return (
		<div id='Dashboard'>
			<Navbar />

			<Grid container>
				<Grid item xs={2} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12} md={10}>
					<Container className='main-area'>
						<Grid container spacing={2} alignItems='center' justify='center'>
							<Grid item xs={12} md={6} lg={6}>
								<div className='chart-card'>
									<div className='chart'>
										<BarChart priority={ticketData.priority} />
									</div>
									<Link className='ticket-type' to='/mytickets'>
										<h3>Tickets by Priority</h3>
									</Link>
								</div>
							</Grid>

							<Grid item xs={12} md={6} lg={6}>
								<div className='chart-card'>
									<div className='chart'>
										<DoughnutChart type={ticketData.type} />
									</div>
									<Link className='ticket-type' to='/mytickets'>
										<h3>Tickets by Type</h3>
									</Link>
								</div>
							</Grid>

							<Grid item xs={12} md={6} lg={6}>
								<div className='chart-card'>
									<div className='chart'>
										<PieChart status={ticketData.status} />
									</div>
									<Link className='ticket-type' to='/mytickets'>
										<h3>Tickets by Status</h3>
									</Link>
								</div>
							</Grid>
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
