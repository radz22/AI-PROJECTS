import { Router } from "express";
import { signIn, signUp, getUserData } from "../controllers/userAuthController";
const userAuthRouter = Router();
userAuthRouter.post("/signin", signIn);
userAuthRouter.post("/signup", signUp);
userAuthRouter.get("/userdata/:id", getUserData);

export default userAuthRouter;
