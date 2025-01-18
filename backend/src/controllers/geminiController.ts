import { Request, Response } from "express";
import { getGeminiResponse } from "../services/geminiService";
export const generateResponse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { prompt } = req.body;
  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  try {
    const response = await getGeminiResponse(prompt);
    res.status(200).json({
      text: response,
      name: "SANTY-AI",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
