import { googleAuthModel } from "../models/googleAuthModel";

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
