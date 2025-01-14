import { Router } from "express";
import { generateResponse } from "../controllers/geminiController";

const geminiRoute = Router();

// Define the route
geminiRoute.post("/gemini", generateResponse);

export default geminiRoute;
