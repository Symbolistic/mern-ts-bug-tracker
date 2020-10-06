export default {
	getNotifications: async (userid: string) => {
		const response = await fetch(`/getnotifications/${userid}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	markRead: async (info: object) => {
		const response = await fetch('/markread', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	deleteNotification: async (info: object) => {
		const response = await fetch('/deletenotification', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
};
