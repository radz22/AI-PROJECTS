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
      res.status(404).json({ msg: "Account not found. Please sign up first." });
      return;
    }
    const token = generateToken({ id: existingUser._id });

    res.json({
      token: token,
      login: true,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
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
      res.status(400).json({ msg: "Account already exists. Please sign in." });
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

    res.status(500).json({ msg: createAccountResult.message });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
};
