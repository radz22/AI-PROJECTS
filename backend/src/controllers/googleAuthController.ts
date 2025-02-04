import { Request, Response, NextFunction } from "express";
import { generateToken } from "../services/jwtService";
import { findEmailService, createAccount } from "../services/googleAuthService";

export const googleAuthSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;
    const existingUser = await findEmailService(email);
    if (!existingUser) {
      return next({
        status: 400,
        message: "Account not exists. Please Sign Up.",
      });
    }
    const token = generateToken({ id: existingUser._id });

    res.status(200).json({
      token: token,
      login: true,
    });
  } catch (error) {
    next(error);
  }
};

export const googleAuthSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, displayname, image } = req.body;

    const existingUser = await findEmailService(email);
    if (existingUser) {
      return next({
        status: 400,
        message: "Account already exists. Please sign in.",
      });
    }

    const createAccountResult = await createAccount(
      email,
      displayname,
      null,
      image
    );
    if (!createAccountResult.success) {
      return next({
        status: 400,
        message: createAccountResult.message,
      });
    }
    res.status(201).json({
      token: createAccountResult.token,
      login: createAccountResult.success,
    });
  } catch (error) {
    if (!res.headersSent) {
      next(error);
    }
  }
};
