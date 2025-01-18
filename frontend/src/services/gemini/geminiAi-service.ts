import axios from "axios";
import { http } from "../../http/http";
export const handlePrompting = async (prompt: string) => {
  try {
    const response = await axios.post(http.geminiAI, { prompt: prompt });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error("Network error or no response from server");
    }
  }
};
