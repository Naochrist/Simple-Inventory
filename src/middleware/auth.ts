import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import httpStatus from 'http-status';
import { errorResponse } from '../utils/helperMethods';

const secret = (process.env.JWT_SECRET as string) || 'example';

export async function auth(req: Request | any, res: Response, next: NextFunction) {
  try {
    const token = req.headers.token || req.cookies.token;
    if (!token) {
      return errorResponse(res, 'No token. Kindly sign in as a User', httpStatus.UNAUTHORIZED)
    }

    let verified = jwt.verify(token, secret);

    if (!verified) {
      return errorResponse(res, 'Invalid Token. Kindly sign in as a User', httpStatus.UNAUTHORIZED)
    }
    next();
  } catch (error) {
    console.log(error);
    return errorResponse(res, 'User could not be authenticated', httpStatus.FORBIDDEN);
  }
}   