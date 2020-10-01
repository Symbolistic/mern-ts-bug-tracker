import { Router } from 'express';
import {
	createProject,
	myProjects,
	getUsers,
	projectPersonnel,
	assignRoles,
	getProjectData,
	updateProject,
} from '../controllers/projectController';

const router = Router();

router.post('/createproject', createProject);
router.post('/myprojects', myProjects);
router.get('/getusers/:projectid', getUsers);
router.post('/projectpersonnel', projectPersonnel);
router.post('/assignroles', assignRoles);
router.get('/getprojectdata/:projectid', getProjectData);
router.post('/updateproject', updateProject);

export default router;
