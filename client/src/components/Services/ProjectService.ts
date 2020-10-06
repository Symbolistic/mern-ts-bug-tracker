export default {
	createProject: async (info: object) => {
		const response = await fetch('/createproject', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	myProjects: async (info: object) => {
		const response = await fetch('/myprojects', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	getUsers: async (projectid: string) => {
		const response = await fetch(`/getusers/${projectid}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	projectPersonnel: async (info: object) => {
		const response = await fetch('/projectpersonnel', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	assignRole: async (info: object) => {
		const response = await fetch('/assignroles', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	getProjectData: async (projectid: string) => {
		const response = await fetch(`/getprojectdata/${projectid}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	getProjectTickets: async (projectid: string) => {
		const response = await fetch(`/getprojecttickets/${projectid}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	updateProject: async (info: object) => {
		const response = await fetch('/updateproject', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	deleteProject: async (info: object) => {
		const response = await fetch('/deleteproject', {
			method: 'POST',
			body: JSON.stringify(info),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	},
	deletePersonnel: async (info: object) => {
		const response = await fetch('/deletepersonnel', {
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
