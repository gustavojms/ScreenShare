import { Router } from "express";
import { UserController } from "../controllers/user/UserController";

export const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.create);