import { Router } from 'express';
import { 
  AddProduct, 
  FetchProducts, 
  FetchProductById 
} from '../controllers/productController';
import { auth } from '../middleware/auth';
import { validateAddProduct } from '../middleware/validations';

const router = Router();

router.get('/', FetchProducts);
router.get('/:id', FetchProductById);
router.post('/', auth, validateAddProduct, AddProduct);

export { router as productsRouter };