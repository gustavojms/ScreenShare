import { Router } from "express";
import { UserController } from "../controllers/user/UserController";
import { ScreenshotController } from "../controllers/screenshot/ScreenshotController";

export const userRouter = Router();
const userController = new UserController();

export const screenshotRouter = Router()
const screenshotController = new ScreenshotController();

userRouter.post("/", userController.create);
userRouter.delete("/:id", userController.delete);

screenshotRouter.post("/",screenshotController.create);
screenshotRouter.delete("/:id",screenshotController.delete)