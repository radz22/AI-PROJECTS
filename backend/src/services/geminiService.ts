import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY is not defined in .env");

const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiResponse = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error with Gemini API:", error);
    throw new Error("Failed to fetch response from Gemini.");
  }
};
