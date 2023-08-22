import { Router } from 'express';
import { CreateCourse, getCourse } from '../controllers/courseController.js';


const router = Router();

router.get('/', getCourse);
router.post('/',CreateCourse);


export const courseRoutes = router;