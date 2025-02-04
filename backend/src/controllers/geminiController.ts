import { Request, Response, NextFunction } from "express";
import { getGeminiResponse } from "../services/geminiService";
export const generateResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { prompt } = req.body;
  if (!prompt) {
    return next({
      status: 400,
      message: "Prompt is required",
    });
  }

  try {
    const response = await getGeminiResponse(prompt);
    res.status(200).json({
      text: response,
      name: "SANTY-AI",
    });
  } catch (error) {
    next(error);
  }
};
