export default {
	createProject: async (info: object) => {
		const response = await fetch('http://localhost:8000/createproject', {
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
	myProjects: async (info: object) => {
		const response = await fetch('http://localhost:8000/myprojects', {
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
