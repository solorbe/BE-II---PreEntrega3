import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middlewares.js';
import { SessionsStatelessController } from '../controllers/sessions-stateless.controller.js';

const router = Router();

router.post('/login', SessionsStatelessController.login);
router.get('/current', authMiddleware, SessionsStatelessController.current);
router.post('/logout', SessionsStatelessController.logout);

export default router;
