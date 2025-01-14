import { Router } from "express";
import {
  googleAuthSignin,
  googleAuthSignup,
} from "../controllers/googleAuthController";
const googleAuthRouter = Router();

googleAuthRouter.post("/signin", googleAuthSignin);
googleAuthRouter.post("/signup", googleAuthSignup);

export default googleAuthRouter;
