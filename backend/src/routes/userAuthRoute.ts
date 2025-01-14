import { Router } from "express";
import { signIn, signUp } from "../controllers/userAuthController";
const userAuthRouter = Router();
userAuthRouter.post("/signin", signIn);
userAuthRouter.post("/signup", signUp);

export default userAuthRouter;
