import { Router } from 'express';
import { userRoutes } from './userRoutes.js';
import { courseRoutes } from './courseRoutes.js';


const router = Router();

// routes
router.use('/user', userRoutes);
router.use('/course',courseRoutes);

export default router;
