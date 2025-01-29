import { Request, Response } from "express";
import { generateToken } from "../services/jwtService";
import { findEmailService, createAccount } from "../services/googleAuthService";

export const googleAuthSignin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;
    const existingUser = await findEmailService(email);
    if (!existingUser) {
      res
        .status(404)
        .json({ message: "Account not found. Please sign up first." });
      return;
    }
    const token = generateToken({ id: existingUser._id });

    res.status(200).json({
      token: token,
      login: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const googleAuthSignup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, displayname, image } = req.body;

    const existingUser = await findEmailService(email);
    if (existingUser) {
      res.status(400).json({ message: "Account already exists" });
      return;
    }

    const createAccountResult = await createAccount(
      email,
      displayname,
      null,
      image
    );
    if (createAccountResult.success) {
      res.status(201).json({
        token: createAccountResult.token,
        login: createAccountResult.success,
      });
      return;
    }

    res.status(400).json({ message: createAccountResult.message });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
