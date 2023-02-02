import { Router } from 'express';
import {
  LoginUser,
  RegisterUser,
  verifyUser,
  forgotPassword,
  UpdateUser,
  getUser,
  userCount,
  
} from '../controllers/userController';
import {
  validateSignupUser,
  validateLoginUser,
  validateForgotPassword,
  validateChangePassword,
  validateUpdateUser,
} from '../middleware/validations';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/signup', validateSignupUser, RegisterUser);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/change-password', auth, validateChangePassword);
router.post('/login', validateLoginUser, LoginUser);
router.get('/verify/:token', verifyUser);
router.patch('/update', auth, validateUpdateUser, UpdateUser);
router.get('/getuser', auth, getUser);
router.get('/count', auth, userCount);
export default router;
