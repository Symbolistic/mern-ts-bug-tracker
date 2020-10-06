export default {
	login: async (user: object) => {
		const response = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.status !== 401) {
			const data = response.json();
			return data;
		} else {
			return {
				isAuthenticated: false,
				user: { name: '', email: '', role: '' },
				message: { msgBody: 'Incorrect Credentials', msgError: true },
			};
		}
	},
	register: async (user: object) => {
		const response = await fetch('/register', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	forgotPassword: (user: object) => {
		return fetch('/api/users/forgot-password', {
			method: 'put',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	resetPassword: (user: object) => {
		return fetch('/api/users/reset-password', {
			method: 'put',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	logout: async () => {
		const response = await fetch('/logout', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	isAuthenticated: async () => {
		const response = await fetch('/authenticated', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		if (response.status !== 401) {
			const data = await response.json();
			return data;
		} else {
			return {
				isAuthenticated: false,
				user: { id: '' },
			};
		}
	},
};
