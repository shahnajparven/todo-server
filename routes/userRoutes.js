import { Router } from 'express';
import { loadUser, loginUser, logout, registerUser } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/restrictTo.js';



const router = Router();

router.post('/login', loginUser);
router.post('/register',registerUser);
router.get('/logout',logout);
router.get('/me', isAuthenticated, loadUser);

export const userRoutes = router;