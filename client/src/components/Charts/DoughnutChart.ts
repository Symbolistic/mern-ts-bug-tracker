import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export const DoughnutChart = () => {
	const data = {
		labels: [
			'Bugs/Errors',
			'Feature Request',
			'Other Comments',
			'Training/Document Requests',
		],

		datasets: [
			{
				label: 'Tickets by Type',

				borderColor: [
					'rgba(255, 206, 86, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(255, 206, 86, 0.2)',
				],

				backgroundColor: [
					'rgba(255, 206, 86, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(255, 206, 86, 0.2)',
				],
			},
		],
	};

	const options = {
		title: {
			display: true,
		},
	};
};
