import { Request, Response } from "express";
import bcrypt from "bcrypt"; // Import bcrypt
import { generateToken } from "../services/jwtService";
import { findEmailService, createAccount } from "../services/googleAuthService";
import { checkPasswordValid } from "../services/userAuthService";

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const emailCheck = await findEmailService(email);
    if (!emailCheck) {
      res.status(400).json({ message: "Account not exists. Please Sign Up." });
      return;
    }
    const checkPassword = await checkPasswordValid(emailCheck.password);

    if (!checkPassword.success) {
      res.status(400).json({
        message: checkPassword.message,
        password: checkPassword.password,
      });
      return;
    }

    if (!checkPassword.password) {
      res.status(500).json({ message: "Error" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      checkPassword.password
    );
    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid password" });
      return;
    }
    const token = generateToken({ id: emailCheck._id });
    res.status(200).send({
      login: true,
      token: token,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, displayname } = req.body;
    const emailCheck = await findEmailService(email);

    if (emailCheck) {
      res.status(400).json({ message: "Account not exists" });
      return;
    }
    const createAccountResult = await createAccount(
      email,
      displayname,
      password
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
    res.status(500).send("Internal Server Error");
  }
};
