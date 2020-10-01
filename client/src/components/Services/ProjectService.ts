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
	getUsers: async (projectid: string) => {
		const response = await fetch(
			`http://localhost:8000/getusers/${projectid}`,
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
	projectPersonnel: async (info: object) => {
		const response = await fetch('http://localhost:8000/projectpersonnel', {
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
	assignRole: async (info: object) => {
		const response = await fetch('http://localhost:8000/assignroles', {
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
	getProjectData: async (projectid: string) => {
		const response = await fetch(
			`http://localhost:8000/getprojectdata/${projectid}`,
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
	updateProject: async (info: object) => {
		const response = await fetch('http://localhost:8000/updateproject', {
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
