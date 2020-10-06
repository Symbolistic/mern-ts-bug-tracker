import React from 'react';
import { Pie } from 'react-chartjs-2';

interface Props {
	status: {
		new: number;
		open: number;
		inProgress: number;
		resolved: number;
		additionalInfoReq: number;
	};
}
export const PieChart: React.FC<Props> = ({ status }) => {
	const data = {
		labels: [
			'New',
			'Open',
			'In Progress',
			'Resolved',
			'Additional Info Required',
		],

		datasets: [
			{
				label: 'Tickets by Type',
				data: [
					status.new,
					status.open,
					status.inProgress,
					status.resolved,
					status.additionalInfoReq,
				],
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
		responsive: true,
		maintainAspectRatio: true,

		plugins: {
			colorschemes: {
				scheme: 'brewer.OrRd5',
			},
		},
	};

	return (
		<div>
			<Pie data={data} options={options} />
		</div>
	);
};
