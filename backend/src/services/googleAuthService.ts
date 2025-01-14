import { googleAuthModel } from "../models/googleAuthModel";
import { generateToken } from "./jwtService";
import bcrypt from "bcrypt"; // Import bcrypt
const saltRounds = 10;

export const createAccount = async (
  email: string,
  displayname: string,
  password: null | string
) => {
  try {
    const existingUser = await googleAuthModel.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        message: "Account already exists. Please sign in.",
      };
    }

    let hashedPassword: string | null = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const newUser = await googleAuthModel.create({
      email,
      displayname,
      password: hashedPassword, // Set hashed password or null
    });

    const token = generateToken({ id: newUser._id });

    return { success: true, user: newUser, token: token };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      message: "Error creating account. Please try again.",
    };
  }
};
export const findEmailService = async (email: string) => {
  try {
    const user = await googleAuthModel.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
};
