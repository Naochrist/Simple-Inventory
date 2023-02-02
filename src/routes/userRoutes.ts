import { Router } from 'express';
import { sampleUserFn } from '../controllers/users';

const router = Router();

/* METHOD and summary info */
router.get('/', sampleUserFn);

export default router;
