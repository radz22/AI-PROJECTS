import { Router } from "express";
import {
  signIn,
  signUp,
  getUserData,
  updateUser,
} from "../controllers/userAuthController";
const userAuthRouter = Router();
userAuthRouter.post("/signin", signIn);
userAuthRouter.post("/signup", signUp);
userAuthRouter.post("/update", updateUser);
userAuthRouter.get("/userdata/:id", getUserData);

export default userAuthRouter;
