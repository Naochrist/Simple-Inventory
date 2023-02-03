import { Router } from 'express';
import { 
  AddStock, 
  FetchStock, 
  FetchStockById 
} from '../controllers/stockController';
import { auth } from '../middleware/auth';
import { validateAddStock } from '../middleware/validations';

const router = Router();

router.get('/', FetchStock);
router.get('/:batchId', FetchStockById);
router.post('/', auth, validateAddStock, AddStock);

export { router as stockRouter };