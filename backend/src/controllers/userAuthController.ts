import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"; // Import bcrypt
import { generateToken } from "../services/jwtService";
import { findEmailService, createAccount } from "../services/googleAuthService";
import {
  checkPasswordValid,
  getUser,
  sendLink,
} from "../services/userAuthService";
import { verifyToken } from "../services/jwtService";
import {
  updateUserAccount,
  forgotPasswordService,
} from "../services/userAuthService";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const emailCheck = await findEmailService(email);
    if (!emailCheck) {
      return next({
        status: 400,
        message: "Account not exists. Please Sign Up.",
      });
    }
    const checkPassword = await checkPasswordValid(emailCheck.password);

    if (!checkPassword.success) {
      return next({ status: 400, message: checkPassword.message });
    }

    if (!checkPassword.password) {
      return next({ status: 400, message: "error" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      checkPassword.password
    );
    if (!isPasswordValid) {
      return next({ status: 400, message: "Invalid password" });
    }
    const token = generateToken({ id: emailCheck._id });
    res.status(200).send({
      login: true,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, displayname, image } = req.body;
    const emailCheck = await findEmailService(email);

    if (emailCheck) {
      return next({
        status: 400,
        message: "Account not exists",
      });
    }
    const createAccountResult = await createAccount(
      email,
      displayname,
      password,
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
    next(error);
  }
};

export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    let tokenPayload;

    try {
      tokenPayload = verifyToken(id);
    } catch (err: any) {
      if (err.message === "Token has expired") {
        return next({
          status: 401,
          message: "Token has expired. Please log in again.",
        });
      } else if (err.message === "Invalid token") {
        return next({
          status: 401,
          message: "Invalid token. Authentication failed.",
        });
      } else {
        return next({
          status: 400,
          message: "Token verification failed.",
        });
      }
    }

    const userId = tokenPayload.id;
    const findUserData = await getUser(userId);

    if (!findUserData.success) {
      return next({
        status: 404,
        message: "User account does not exist.",
      });
    }

    res.status(200).json({
      message: "User data retrieved successfully",
      data: findUserData.user,
    });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id, email, password, displayname, image, cloudinaryid } = req.body;

    if (!cloudinaryid) {
      return next({
        status: 400,
        message: "No Cloudinary Id",
      });
    }
    const updateUser = await updateUserAccount(
      _id,
      email,
      password,
      displayname,
      image,
      cloudinaryid
    );

    if (!updateUser.success) {
      return next({
        status: 400,
        message: updateUser.errormessage,
      });
    }
    res.status(200).json({ message: updateUser.message });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const forgotPasswordResult = await forgotPasswordService(id, password);
    if (!forgotPasswordResult) {
      return next({
        status: 400,
        message: "Password not updated",
      });
    }
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;
    const emailCheck = await findEmailService(email);

    if (!emailCheck) {
      return next({
        status: 400,
        message: "Account not exists",
      });
    }

    const sendLinkForgot = await sendLink(email);

    if (!sendLinkForgot) {
      return next({
        status: 400,
        message: "Link not sent",
      });
    }
    res.status(200).json({ message: "Link sent successfully" });
  } catch (error) {
    next(error);
  }
};
