import { Router } from 'express';
import { CreateCourse, getCourse } from '../controllers/courseController.js';


const router = Router();

router.get('/fetch', getCourse);
router.post('/create',CreateCourse);


export const courseRoutes = router;