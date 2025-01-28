import { Request, Response } from "express";
import bcrypt from "bcrypt"; // Import bcrypt
import { generateToken } from "../services/jwtService";
import { findEmailService, createAccount } from "../services/googleAuthService";
import { checkPasswordValid, getUser } from "../services/userAuthService";
import { verifyToken } from "../services/jwtService";
import { updateUserAccount } from "../services/userAuthService";
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
    const { email, password, displayname, image } = req.body;
    const emailCheck = await findEmailService(email);

    if (emailCheck) {
      res.status(400).json({ message: "Account not exists" });
      return;
    }
    const createAccountResult = await createAccount(
      email,
      displayname,
      password,
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
    res.status(500).send("Internal Server Error");
  }
};

export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    let tokenPayload;

    try {
      tokenPayload = verifyToken(id);
    } catch (err: any) {
      if (err.message === "Token has expired") {
        res
          .status(401)
          .json({ message: "Token has expired. Please log in again." });
        return;
      } else if (err.message === "Invalid token") {
        res
          .status(401)
          .json({ message: "Invalid token. Authentication failed." });
        return;
      } else {
        res.status(400).json({ message: "Token verification failed." });
        return;
      }
    }

    const userId = tokenPayload.id;
    const findUserData = await getUser(userId);

    if (!findUserData.success) {
      res.status(404).json({ message: "User account does not exist." });
      return;
    }

    res.status(200).json({
      message: "User data retrieved successfully",
      data: findUserData.user,
    });
  } catch (error) {
    console.error("Error in getUserData controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id, email, password, displayname, image, cloudinaryid } = req.body;

    if (!cloudinaryid) {
      res.status(400).json({ message: "No Cloudinary Id" });
      return;
    }
    const updateUser = await updateUserAccount(
      _id,
      email,
      password,
      displayname,
      image,
      cloudinaryid
    );

    if (updateUser.success == false) {
      res.status(400).json({ message: updateUser.errormessage });
      return;
    }
    res.status(200).json({ message: updateUser.message });
  } catch (error) {
    console.error("Error in getUserData controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
