import axios from "axios";
import { userType } from "../../types/profile-type";
import { http } from "../../http/http";
export const googleSignIn = async (user: userType) => {
  try {
    const response = await axios.post(http.googleSignin, { email: user.email });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};

export const googleSignup = async (user: userType) => {
  try {
    const response = await axios.post(http.googleSignup, user);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};
