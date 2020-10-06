import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

interface Props {
	priority: {
		low: number;
		medium: number;
		high: number;
	};
}
export const BarChart: React.FC<Props> = ({ priority }) => {
	const data = {
		labels: ['Low', 'Medium', 'High'],

		datasets: [
			{
				label: 'Tickets by Priority',
				data: [priority.low, priority.medium, priority.high],

				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	const options = {
		title: {
			display: false,
		},
		legend: {
			display: false,
		},

		scales: {
			xAxes: [
				{
					gridLines: {
						offsetGridLines: true,
					},
				},
			],
			yAxes: [
				{
					ticks: {
						min: 0,
						max: Math.max(priority.low, priority.medium, priority.high) + 5,
						stepSize: 1,
					},
				},
			],
		},

		responsive: true,
		maintainAspectRatio: true,
	};

	return (
		<div>
			<Bar data={data} options={options} />
		</div>
	);
};
