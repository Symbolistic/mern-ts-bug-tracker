export default {
	getNotifications: async (userid: string) => {
		const response = await fetch(
			`http://localhost:8000/getnotifications/${userid}`,
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
	markRead: async (info: object) => {
		const response = await fetch('http://localhost:8000/markread', {
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
	deleteNotification: async (info: object) => {
		const response = await fetch('http://localhost:8000/deletenotification', {
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
