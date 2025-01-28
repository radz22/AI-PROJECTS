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
  password: string,
  displayname: string,
  image: string,
  cloudinaryid: string
) => {
  let hashedPassword: string | null = null;
  let imageUrl;
  let cloudinaryId;
  const findById = await googleAuthModel.findById({ _id: id });
  const imageUrlDatabase = findById?.image;
  const getCloudinaryId = findById?.cloudinaryid;
  if (image !== imageUrlDatabase) {
    await cloudinary.v2.uploader.destroy(cloudinaryid);

    const uploadNewImage = await cloudinary.v2.uploader.upload(image, {
      upload_preset: "",
    });
    (imageUrl = uploadNewImage.url), (cloudinaryId = uploadNewImage.public_id);
  } else {
    imageUrl = imageUrlDatabase;
    cloudinaryId = getCloudinaryId;
  }
  if (password && password !== "") {
    hashedPassword = await bcrypt.hash(password, saltRounds);
  }
  const updateData: any = {
    email: email,
    displayname: displayname,
    image: imageUrl,
    cloudinaryid: cloudinaryId,
  };

  if (hashedPassword) {
    updateData.password = hashedPassword;
  }

  const updateUser = await googleAuthModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updateUser) {
    return {
      errormessage: "User not updated",
      success: false,
    };
  }

  return {
    message: "User updated",
    success: true,
  };
};
