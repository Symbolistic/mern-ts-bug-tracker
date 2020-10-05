import { Router } from 'express';
import {
	createProject,
	myProjects,
	getUsers,
	projectPersonnel,
	assignRoles,
	getProjectData,
	updateProject,
	getProjectTickets,
	deleteProject,
	deletePersonnel,
} from '../controllers/projectController';

const router = Router();

router.post('/createproject', createProject);
router.post('/myprojects', myProjects);
router.get('/getusers/:projectid', getUsers);
router.post('/projectpersonnel', projectPersonnel);
router.post('/assignroles', assignRoles);
router.get('/getprojectdata/:projectid', getProjectData);
router.get('/getprojecttickets/:projectid', getProjectTickets);
router.post('/updateproject', updateProject);
router.post('/deleteproject', deleteProject);
router.post('/deletepersonnel', deletePersonnel);

export default router;
