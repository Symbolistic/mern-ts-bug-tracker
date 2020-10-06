export default {
	addTicket: async (info: object) => {
		const response = await fetch('/addticket', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	getMyTickets: async (id: string) => {
		const response = await fetch(`/mytickets/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	getTicketDetails: async (id: string) => {
		const response = await fetch(`/getticketdetails/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	editTicket: async (info: object) => {
		const response = await fetch('/editticket', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	createTicketComment: async (info: object) => {
		const response = await fetch('/createticketcomment', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	getTicketComments: async (id: string) => {
		const response = await fetch(`/getticketcomments/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	getTicketHistory: async (id: string) => {
		const response = await fetch(`/gettickethistory/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	uploadTicketAttachment: async (info: object) => {
		const response = await fetch('/uploadticketattachment', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	getTicketAttachments: async (id: string) => {
		const response = await fetch(`/getticketattachments/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	deleteTicket: async (info: object) => {
		const response = await fetch('/deleteticket', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	deleteComment: async (info: object) => {
		const response = await fetch('/deletecomment', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	deleteAttachment: async (info: object) => {
		const response = await fetch('/deleteattachment', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	getChartData: async (id: string) => {
		const response = await fetch(`/chartdata/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
};
