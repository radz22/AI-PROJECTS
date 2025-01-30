import { googleAuthModel } from "../models/googleAuthModel";
import cloudinary from "./cloudinary";
import bcrypt from "bcrypt";
import SendEmail from "./nodemailer";
import "dotenv/config";

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

export const forgotPasswordService = async (id: string, password: string) => {
  const hashPassword = await bcrypt.hash(password, saltRounds);

  const updatePassword = await googleAuthModel.findByIdAndUpdate(id, {
    password: hashPassword,
  });
  if (!updatePassword) {
    return false;
  }
  return true;
};
export const sendLink = async (email: string) => {
  const findEmail = await googleAuthModel.findOne({ email: email });

  if (!findEmail) {
    return false;
  }
  const getId = findEmail._id;
  const resetLink = `http://localhost:5173/page/forgotpassword/${getId}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset Request",
    text: `Hi,\n\nWe received a request to reset your password. Please use the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nBarangay BonBon`, // Plain text version
    html: `<p>Hi,</p>
           <p>We received a request to reset your password. Please use the link below to reset your password:</p>
           <p><a href="${resetLink}" target="_blank" style="color: blue;">Reset Password</a></p>
           <p>If you did not request this, please ignore this email.</p>
           <p>Best regards,<br>CHAT BOSS</p>`, // HTML version
  };

  const emailSent = await SendEmail(mailOptions);

  if (!emailSent) {
    return false;
  }

  return true;
};
