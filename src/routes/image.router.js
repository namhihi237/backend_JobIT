import { imageController } from "../controllers";
import { authMiddleware, roleMiddleware } from "../middlewares";
import { Router } from "express";
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
import constant from "../constant";
const { ACTION_CODE } = constant;

export const imageRouter = Router();

imageRouter.route("/api/v1/images").get(jwtMidleware, imageController.uploadImageProfile);

imageRouter.route("/api/v1/images").post(jwtMidleware, imageController.saveUrlImageUser);
