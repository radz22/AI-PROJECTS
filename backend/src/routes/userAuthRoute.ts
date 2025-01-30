import { Router } from "express";
import {
  signIn,
  signUp,
  getUserData,
  updateUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userAuthController";
const userAuthRouter = Router();
userAuthRouter.post("/signin", signIn);
userAuthRouter.post("/signup", signUp);
userAuthRouter.post("/update", updateUser);
userAuthRouter.get("/userdata/:id", getUserData);
userAuthRouter.put("/forgotpassword/:id", forgotPassword);
userAuthRouter.post("/resetpassword", resetPassword);
export default userAuthRouter;
