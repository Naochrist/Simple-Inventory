import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { UserInstance } from '../models/userModel';
import { generateLoginToken } from '../utils/utils';
import bcrypt from 'bcrypt';
import { errorResponse, serverError, successResponse, successResponseLogin } from '../utils/helperMethods';
// import { forgotPasswordVerification } from '../mailer/forgotPasswordVerification';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'

dotenv.config()

const fromUser = process.env.FROM as string;
const jwtsecret = process.env.JWT_SECRET as string;
interface jwtPayload {
  email: string;
  id: string;
}

export const RegisterUser = async (req: Request, res: Response): Promise<unknown> => {
  const userId = uuidv4();
  try {
    const duplicateEmail = await UserInstance.findOne({
      where: { email: req.body.email },
    });
    if (duplicateEmail) {
      return errorResponse(res, 'Email already exists', httpStatus.CONFLICT);
    }
    const duplicatePhoneNumber = await UserInstance.findOne({
      where: { phoneNumber: req.body.phoneNumber },
    });
    if (duplicatePhoneNumber) {
      return errorResponse(res, 'Phone number already exists', httpStatus.CONFLICT);
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const { firstName, lastName, userName, email, phoneNumber } = req.body;

    const user = {
      id: userId,
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      password: hashPassword,
    };
    const record = await UserInstance.create(user);

    const token = generateLoginToken({ userId, email });
  //   if (record) {
  //     const html = emailVerificationView(token);
  //     await mailer.sendEmail(fromUser, req.body.email, 'please verify your email', html);
  //   }
    return successResponse(res, 'User created successfully', httpStatus.CREATED, { ...record, token });
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

export async function verifyUser(req: Request, res: Response) {
  try {
    const token = req.params.token;
    const { email } = jwt.verify(token, jwtsecret) as jwtPayload;

    if (!email) {
      return errorResponse(res, 'Verification failed', httpStatus.BAD_REQUEST);
    } else {
      const updated = await UserInstance.update({ isVerified: true }, { where: { email: email } });
      if (updated) {
       return res.redirect(`${process.env.FRONTEND_URL}/login`);

      }
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}

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
    if (!user.isVerified) {
      return errorResponse(res, 'Kindly verify your email', httpStatus.UNAUTHORIZED);
    }
    if (validUser) {
      return successResponseLogin(res, 'Login successfully', httpStatus.OK, user, token);
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const user = (await UserInstance.findOne({
      where: {
        email: email,
      },
    })) as unknown as { [key: string]: string };
    if (!user) {
      return errorResponse(res, 'Email not found', httpStatus.NOT_FOUND);
    }
    const { id } = user;
    const subject = 'Password Reset';
    const token = jwt.sign({ id }, jwtsecret, { expiresIn: '30mins' });
    return token
    // const html = forgotPasswordVerification(token);
    // await mailer.sendEmail(fromUser, req.body.email, subject, html);
    // return successResponse(res, 'Check email for the verification link', httpStatus.OK, {});
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    const token = req.headers.token as string;
    const { id } = jwt.verify(token, jwtsecret) as unknown as jwtPayload;
    const user = await UserInstance.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return errorResponse(res, 'User does not exist', httpStatus.NOT_FOUND);
    }
    const passwordHash = await bcrypt.hash(req.body.password, 8);
    await user?.update({
      password: passwordHash,
    });
    return successResponse(res, 'Password Successfully Changed', httpStatus.OK, {});
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}

export async function UpdateUser(req: Request, res: Response) {
  try {
    const token = req.headers.token as string;
    const { id } = jwt.verify(token, jwtsecret) as jwtPayload;
    const { firstName, lastName, phoneNumber, avatar } = req.body;

    const data = await UserInstance.findOne({ where: { id } });
    if (!data) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'user not found' });
    }

    const updateUser = await data.update({
      firstName,
      lastName,
      phoneNumber,
    });

    successResponse(res, 'User updated successfully', httpStatus.CREATED, updateUser);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}

export async function getUser(req: Request | any, res: Response) {
  try {
    const verified = req.headers.token;

    const token = jwt.verify(verified, jwtsecret) as jwtPayload;

    const { id } = token;

    const record = await UserInstance.findOne({ where: { id } });
    if (!record) {
      return errorResponse(res, `Can not find User. `, httpStatus.NOT_FOUND);
    }
    return successResponse(res, 'You have successfully fetch user details', httpStatus.OK, record);
  } catch (error) {
    console.log(error);
    serverError(res);
  }
}
export async function userCount(req: Request | any, res: Response) {
  try {

    const verifiedUser = await UserInstance.count({ where: { isVerified:true } });
    const unVerifiedUser = await UserInstance.count({ where: { isVerified:false } });

    return successResponse(res, 'You have successfully fetch user details', httpStatus.OK, {isVerified: verifiedUser, unVerified: unVerifiedUser});
  } catch (error) {
    console.log(error);
    serverError(res);
  }
}

export const adminOtp = async (req: Request, res: Response): Promise<unknown> => {
  try {
    const token = req.headers.token as string;
    const otpId = uuidv4();
    const { id } = jwt.verify(token, jwtsecret) as jwtPayload;

    const admin = (await UserInstance.findOne({
      where: { id },
    })) as unknown as { [key: string]: string };

    if (!admin) {
      return errorResponse(res, 'admin not found', httpStatus.BAD_REQUEST);
    }
  //  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

  //  if (admin) {
  //   const html = otpMessage(otp);
  //     await mailer.sendEmail(fromUser, admin.email, 'Check your mail for otp', html);
  //     await OtpInstance.create({id: otpId, otp, userId: id})
  //   }
  //   return successResponse(res, 'Kindly check your mail for OTP ', httpStatus.OK, {});
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};


