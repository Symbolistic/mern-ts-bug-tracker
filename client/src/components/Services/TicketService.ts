export default {
	addTicket: async (info: object) => {
		const response = await fetch('http://localhost:8000/addticket', {
			method: 'POST',
			body: JSON.stringify(info),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	getMyTickets: async (id: string) => {
		const response = await fetch(`http://localhost:8000/mytickets/${id}`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	getTicketDetails: async (id: string) => {
		const response = await fetch(
			`http://localhost:8000/getticketdetails/${id}`,
			{
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response.json();
		return data;
	},
	editTicket: async (info: object) => {
		const response = await fetch('http://localhost:8000/editticket', {
			method: 'POST',
			body: JSON.stringify(info),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	createTicketComment: async (info: object) => {
		const response = await fetch('http://localhost:8000/createticketcomment', {
			method: 'POST',
			body: JSON.stringify(info),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	getTicketComments: async (id: string) => {
		const response = await fetch(
			`http://localhost:8000/getticketcomments/${id}`,
			{
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response.json();
		return data;
	},
	getTicketHistory: async (id: string) => {
		const response = await fetch(
			`http://localhost:8000/gettickethistory/${id}`,
			{
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response.json();
		return data;
	},
	uploadTicketAttachment: async (info: object) => {
		const response = await fetch(
			'http://localhost:8000/uploadticketattachment',
			{
				method: 'POST',
				body: JSON.stringify(info),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response.json();
		return data;
	},
	getTicketAttachments: async (id: string) => {
		const response = await fetch(
			`http://localhost:8000/getticketattachments/${id}`,
			{
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response.json();
		return data;
	},
	deleteTicket: async (info: object) => {
		const response = await fetch('http://localhost:8000/deleteticket', {
			method: 'POST',
			body: JSON.stringify(info),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	deleteComment: async (info: object) => {
		const response = await fetch('http://localhost:8000/deletecomment', {
			method: 'POST',
			body: JSON.stringify(info),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	deleteAttachment: async (info: object) => {
		const response = await fetch('http://localhost:8000/deleteattachment', {
			method: 'POST',
			body: JSON.stringify(info),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
};
