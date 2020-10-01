import { Response, Request } from 'express';
import { ProjectInt } from '../types/project';
import { Project } from '../models/Project';
import { ProjectRoleInt } from '../types/projectrole';
import { ProjectRole } from '../models/ProjectRole';
import Role from '../types/projectrole';
import { User } from '../models/User';
import { ObjectId } from 'mongodb';

interface MyDetailedError {
	properties: {
		path: string;
		message: string;
	};
}

interface MyError {
	message: string;
	code: number;
	errors: MyDetailedError[];
}

// Handle Errors
const handleErrors = (err: MyError) => {
	console.log(err.message, err.code);

	let errors: { [key: string]: string } = {
		name: '',
		email: '',
		password: '',
		message: '',
	};

	if (err.message === 'Unauthorized!') {
		errors.message = err.message;
	}

	return errors;
};

const createProject = async (req: Request, res: Response) => {
	const { userFrom, name, description } = req.body;

	try {
		// First find the logged in User
		const user = await User.findById({ _id: userFrom });

		// Make sure we found the user
		if (!user) {
			res.status(400).json({ projectCreated: false });
		} else {
			const project: ProjectInt = await Project.create({
				userFrom,
				name,
				description,
			});

			const projectRole: ProjectRoleInt = await ProjectRole.create({
				user: user._id,
				projectFrom: project._id,
				name: user.name,
				email: user.email,
				role: Role.OWNER,
			});

			res.status(200).json({ projectCreated: true });
		}
	} catch (error) {
		console.log(error);
	}
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
	} catch (error) {
		console.log(error);
	}
};

const getUsers = async (req: Request, res: Response) => {
	// This comes as a string since its a Param, so we convert it to a Mongoose Object ID
	const projectFrom = new ObjectId(req.params.projectid);

	// Here we grab the personnel for this project to use as a filter
	const personnel = await ProjectRole.find({ projectFrom })
		.select({
			_id: 0,
			email: 1,
		})
		.distinct('email'); // This takes the emails out of the objects and returns an array of emails

	// Now we find all the users in the database and use $nin to NOT INCLUDE users already in our personnel
	const users = await User.find({
		email: { $nin: personnel },
	}).select({ _id: 1, email: 1 });

	res.status(200).json({ users });
};

const projectPersonnel = async (req: Request, res: Response) => {
	// This comes as implicitly set as 'any', so we convert it to a Mongoose Object ID
	const projectFrom = new ObjectId(req.body.projectFrom);
	try {
		const personnel = await ProjectRole.find({ projectFrom }).select({
			name: 1,
			email: 1,
			role: 1,
		});

		res.status(200).json({ users: personnel });
	} catch (error) {
		console.log(error);
	}
};

const assignRoles = async (req: Request, res: Response) => {
	const { userID, projectFrom, users, role } = req.body;

	try {
		const currentUser = await ProjectRole.findOne({
			user: userID,
			projectFrom,
		});

		// This checks to make sure the logged in User is a Owner or Admin of the Project
		if (!currentUser) throw new Error('Unauthorized!');
		const adminOrOwner = [Role.ADMIN, Role.OWNER].includes(
			currentUser.role as Role
		);
		if (!adminOrOwner) throw new Error('Unauthorized!');

		// Now we gather the data of the users
		const usersData = await User.find({ email: { $in: users } }).select({
			_id: 1,
			name: 1,
			email: 1,
		});

		// Organize the data into an array of objects
		let batch = usersData.map((user) => {
			return {
				user: user._id,
				projectFrom: projectFrom,
				name: user.name,
				email: user.email,
				role: role,
			};
		});

		// Now create roles for those selected users in the selected project
		const data = await ProjectRole.insertMany(batch);
		res.status(200).json({ data, success: true });
	} catch (error) {
		const errors = handleErrors(error);
		console.log(errors);
		res.status(401).json({ errors });
	}
};

const getProjectData = async (req: Request, res: Response) => {
	// This comes as a string since its a Param, so we convert it to a Mongoose Object ID
	const projectFrom = new ObjectId(req.params.projectid);

	try {
		const projectInfo = await Project.findById({ _id: projectFrom }).select({
			name: 1,
			description: 1,
		});

		const projectPersonnel = await ProjectRole.find({ projectFrom }).select({
			name: 1,
			email: 1,
			role: 1,
		});

		res.status(200).json({
			project: projectInfo,
			personnel: projectPersonnel,
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};

const updateProject = async (req: Request, res: Response) => {
	const { projectID, name, description, user } = req.body;
	let data;
	try {
		if (!name && !description) {
			throw new Error('Name and Description are undefined!');
		}

		const currentUser = await ProjectRole.findOne({
			user: user,
			projectFrom: projectID,
		});

		// This checks to make sure the logged in User is a Owner or Admin of the Project
		if (!currentUser) throw new Error('Unauthorized!');
		const adminOrOwner = [Role.ADMIN, Role.OWNER].includes(
			currentUser.role as Role
		);
		if (!adminOrOwner) throw new Error('Unauthorized!');

		if (name) {
			data = await Project.findOneAndUpdate({ _id: projectID }, { name });
		}

		if (description) {
			data = await Project.findOneAndUpdate(
				{ _id: projectID },
				{ description }
			);
		}

		res.status(200).json({ success: true });
	} catch (error) {
		const errors = handleErrors(error);
		res.status(401).json({ errors });
	}
};

export {
	createProject,
	myProjects,
	getUsers,
	projectPersonnel,
	assignRoles,
	getProjectData,
	updateProject,
};
