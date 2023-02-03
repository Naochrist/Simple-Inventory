import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { errorResponse } from '../utils/helperMethods';
import {
  options,
  userSchema,
  loginSchema,
  productSchema,
  stockSchema
} from '../utils/utils';

export const validateSignupUser = (req: Request, res: Response, next: NextFunction) => {
  const validateUser = userSchema.validate(req.body, options);
  if (validateUser.error) {
    return errorResponse(res, validateUser.error.details[0].message, httpStatus.BAD_REQUEST)
  }
  next();
};

export const validateLoginUser = (req: Request, res: Response, next: NextFunction) => {
  const validateResult = loginSchema.validate(req.body, options);
  if (validateResult.error) {
    return errorResponse(res, validateResult.error.details[0].message, httpStatus.BAD_REQUEST)
  }
  next();
};

export const validateAddProduct = (req: Request, res: Response, next: NextFunction) => {
  const validateResult = productSchema.validate(req.body, options);
  if (validateResult.error) {
    return errorResponse(res, validateResult.error.details[0].message, httpStatus.BAD_REQUEST)
  }
  next();
}

export const validateAddStock = (req: Request, res: Response, next: NextFunction) => {
  const validateResult = stockSchema.validate(req.body, options);
  if (validateResult.error) {
    return errorResponse(res, validateResult.error.details[0].message, httpStatus.BAD_REQUEST)
  }
  next();
}
