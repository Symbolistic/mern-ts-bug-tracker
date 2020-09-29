import { Router } from 'express';
import { createProject, myProjects } from '../controllers/projectController';

const router = Router();

router.post('/createproject', createProject);
router.post('/myprojects', myProjects);

export default router;
