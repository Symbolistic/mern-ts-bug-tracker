import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface Props {
	type: {
		bugsError: number;
		featureReq: number;
		other: number;
		training: number;
	};
}
export const DoughnutChart: React.FC<Props> = ({ type }) => {
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
				data: [type.bugsError, type.featureReq, type.other, type.training],
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
				scheme: 'brewer.PuOr4',
			},
		},
	};

	return (
		<div>
			<Doughnut data={data} options={options} />
		</div>
	);
};
