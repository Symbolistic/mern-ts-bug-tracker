import { Router } from 'express';
import { checkUser } from '../middleware/authMiddlware';
import {
	register_post,
	login_post,
	logout_get,
	authenticated,
	demo_login,
} from '../controllers/authController';

const router = Router();

router.post('/register', register_post);
router.post('/login', login_post);
router.get('/logout', logout_get);
router.get('/authenticated', checkUser, authenticated);
router.post('/demologin', demo_login);

export default router;
