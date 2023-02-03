import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { UserInstance } from '../models/userModel';
import { generateLoginToken } from '../utils/utils';
import bcrypt from 'bcrypt';
import { errorResponse, serverError, successResponse, successResponseLogin } from '../utils/helperMethods';
import httpStatus from 'http-status';
import dotenv from 'dotenv';

dotenv.config()

export const RegisterUser = async (req: Request, res: Response): Promise<unknown> => {
  const userId = uuidv4();
  try {
    const duplicateEmail = await UserInstance.findOne({
      where: { email: req.body.email },
    });
    if (duplicateEmail) {
      return errorResponse(res, 'Email already exists', httpStatus.CONFLICT);
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const { firstName, lastName, email } = req.body;

    const user = {
      id: userId,
      firstName,
      lastName,
      email,
      password: hashPassword,
    };
    const record = await UserInstance.create(user);
    return successResponse(res, 'User created successfully', httpStatus.CREATED, { ...record });
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

export const LoginUser = async (req: Request, res: Response): Promise<unknown> => {
  try {
    const user = (await UserInstance.findOne({
      where: { email: req.body.email },
    })) as unknown as { [key: string]: string };
    if (!user) {
      return errorResponse(res, 'Incorrect credentials', httpStatus.BAD_REQUEST);
    }
    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) {
      return errorResponse(res, 'Incorrect credentials', httpStatus.BAD_REQUEST);
    }
    const { id, email } = user;
    const token = generateLoginToken({ id, email });
    if (validUser) {
      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      return successResponseLogin(res, 'Login successfully', httpStatus.OK, user, token);
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};