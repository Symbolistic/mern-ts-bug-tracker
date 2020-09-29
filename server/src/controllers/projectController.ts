import { Response, Request } from 'express';
import { ProjectInt } from '../types/project';
import { Project } from '../models/Project';
import { ProjectRoleInt } from '../types/projectrole';
import { ProjectRole } from '../models/ProjectRole';
import Role from '../types/projectrole';

const createProject = async (req: Request, res: Response) => {
	const { userFrom, name, description } = req.body;

	try {
		const project: ProjectInt = await Project.create({
			userFrom,
			name,
			description,
		});

		const projectRole: ProjectRoleInt = await ProjectRole.create({
			user: userFrom,
			projectFrom: project._id,
			role: Role.OWNER,
		});

		res.status(200).json({ projectCreated: true });
	} catch (err) {}
};

const myProjects = async (req: Request, res: Response) => {
	const { user } = req.body;

	try {
		// Gather the roles first because each role is linked to a single project,
		// we will backtrack this way.
		const projectRoles = await ProjectRole.find({ user });

		// Organize all the Project ID's into an array
		const projectIDList = projectRoles.map((val) => val.projectFrom);

		// Now use that organized array to find all the Projects
		const projects = await Project.find({ _id: { $in: [...projectIDList] } });
		res.status(200).json({ projects, success: true });
	} catch (error) {}
};

export { createProject, myProjects };
