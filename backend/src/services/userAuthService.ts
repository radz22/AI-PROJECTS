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
