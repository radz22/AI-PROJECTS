import axios from "axios";
import { userType } from "../../types/profile-type";
import { http } from "../../http/http";
import { userDataType } from "../../types/user-data-type";
export const userSignin = async (user: userType) => {
  try {
    const response = await axios.post(http.userSignin, {
      email: user.email,
      password: user.password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};

export const userSignUp = async (user: userType) => {
  try {
    const response = await axios.post(http.userSignup, user);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};

export const getUserData = async (token: string | null) => {
  try {
    const response = await axios.get(`${http.userGetData}/${token}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};
export const updateUserData = async (data: userDataType) => {
  try {
    const response = await axios.post(http.userEditAccount, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};
