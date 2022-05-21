import { Router } from 'express';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import verifyAuth from './middlewares/verifyAuth';

const router = Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/refreshToken', AuthController.refreshToken);
router.get('/users', verifyAuth, UserController.listAll);

export default router;
