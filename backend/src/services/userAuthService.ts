import { googleAuthModel } from "../models/googleAuthModel";
import cloudinary from "./cloudinary";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const checkPasswordValid = async (password: string | undefined) => {
  if (password == null) {
    return {
      message: "Your Account is Directly Sign Up Using Google Auth",
      success: false,
    };
  }
  return {
    success: true,
    password: password,
  };
};

export const getUser = async (id: string) => {
  const findUserById = await googleAuthModel.findById({ _id: id });

  if (!findUserById) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    user: findUserById,
  };
};

export const updateUserAccount = async (
  id: string,
  email: string,
  password: string | null,
  displayname: string,
  image: string,
  cloudinaryid: string
) => {
  let hashedPassword: string | null = null;

  const cloudinaryRemoveImage = await cloudinary.v2.uploader.destroy(
    cloudinaryid
  );
  if (!cloudinaryRemoveImage) {
    return {
      errormessage: "Cloudinary Id error",
      success: false,
    };
  }
  const uploadNewImage = await cloudinary.v2.uploader.upload(image, {
    upload_preset: "",
  });
  if (password) {
    hashedPassword = await bcrypt.hash(password, saltRounds);
  }
  const updateUser = await googleAuthModel.findByIdAndUpdate(
    id,
    {
      email: email,
      password: hashedPassword,
      displayname: displayname,
      image: uploadNewImage.url,
      cloudinaryid: uploadNewImage.public_id,
    },
    { new: true }
  );
  if (!updateUser) {
    return {
      errormessage: "user not Updated",
      success: false,
    };
  }
  return {
    message: "user updated",
    success: true,
  };
};
