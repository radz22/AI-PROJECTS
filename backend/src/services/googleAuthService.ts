import { googleAuthModel } from "../models/googleAuthModel";
import { generateToken } from "./jwtService";
import bcrypt from "bcrypt";
import cloudinary from "./cloudinary";
const saltRounds = 10;

export const createAccount = async (
  email: string,
  displayname: string,
  password: null | string,
  image: string
) => {
  try {
    let hashedPassword: string | null = null;
    const existingUser = await googleAuthModel.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        message: "Account already exists. Please sign in.",
      };
    }

    const uploadedResponse = await cloudinary.v2.uploader.upload(image, {
      upload_preset: "",
    });

    if (!uploadedResponse) {
      return {
        success: false,
        message: "Cloudinary Error",
      };
    }
    if (password) {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const newUser = await googleAuthModel.create({
      email,
      displayname,
      password: hashedPassword,
      image: uploadedResponse.url,
      cloudinaryid: uploadedResponse.public_id,
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
