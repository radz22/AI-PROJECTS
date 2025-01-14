import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY is not defined in .env");

const client = new GoogleGenerativeAI(apiKey);

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent([prompt]);
    return response.response.text();
  } catch (error) {
    console.error("Error with Gemini API:", error);
    throw new Error("Failed to fetch response from Gemini.");
  }
};
