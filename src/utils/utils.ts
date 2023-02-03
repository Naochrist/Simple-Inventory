import Joi from 'joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirmPassword: Joi.ref('password'),
}).with('password', 'confirmPassword');

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const stockSchema = Joi.object().keys({
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
  batchId: Joi.string().required(),
});

export const productSchema = Joi.object().keys({
  productName: Joi.string().required(),
  productPrice: Joi.number().required(),
  productType: Joi.string().required()
})

export const generateLoginToken = (user: { [key: string]: unknown }): string => {
  const secret = (process.env.JWT_SECRET as string) || 'example';
  return jwt.sign(user, secret, { expiresIn: '1d' });
};

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: '',
    },
  },
}
