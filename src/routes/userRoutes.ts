import { Router } from 'express';
import {
  LoginUser,
  RegisterUser
} from '../controllers/userController';
import {
  validateSignupUser,
  validateLoginUser
} from '../middleware/validations';

const router = Router();

router.post('/signup', validateSignupUser, RegisterUser);
router.post('/login', validateLoginUser, LoginUser);

export { router as usersRouter };
