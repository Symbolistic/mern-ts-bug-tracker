export default {
	login: (user: object) => {
		return fetch('http://localhost:8000/login', {
			method: 'POST',
			body: JSON.stringify(user),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => {
			if (res.status !== 401) return res.json().then((data) => data);
			else
				return {
					isAuthenticated: false,
					user: { name: '', email: '', role: '' },
					message: { msgBody: 'Incorrect Credentials', msgError: true },
				};
		});
	},
	register: (user: object) => {
		return fetch('http://localhost:8000/register', {
			method: 'POST',
			body: JSON.stringify(user),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
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
	logout: () => {
		return fetch('http://localhost:8000/logout', {
			method: 'GET',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	isAuthenticated: () => {
		return fetch('http://localhost:8000/authenticated', {
			method: 'GET',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then((res) => {
			if (res.status !== 401) return res.json().then((data) => data);
			else
				return {
					isAuthenticated: false,
					user: { id: '' },
				};
		});
	},
};
