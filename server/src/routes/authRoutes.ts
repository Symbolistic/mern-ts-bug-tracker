import { Router } from 'express';
import { checkUser } from '../middleware/authMiddlware';
import {
	register_get,
	register_post,
	login_get,
	login_post,
	logout_get,
	authenticated,
} from '../controllers/authController';

const router = Router();

router.get('/register', register_get);
router.post('/register', register_post);
router.get('/login', login_get);
router.post('/login', login_post);
router.get('/logout', logout_get);
router.get('/authenticated', checkUser, authenticated);

export default router;
