import { Router } from 'express';
import { sampleIndexFn } from '../controllers/index';

const router = Router();

/* METHOD and summary info */
router.get('/', sampleIndexFn);

export default router;
