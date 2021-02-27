import { Router } from "express";
import { iterController } from "../controllers";
import { validateRequestBody, authMiddleware, roleMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
const { updateIterSchema } = validateRequestBody;
const { getUserProfile, updateProfile } = iterController;

export const iterRouter = Router();

iterRouter
    .route("/api/v1/iter/profile")
    .get(jwtMidleware, checkPer("VIEW_PROFILE"), getUserProfile);

iterRouter
    .route("/api/v1/iter/profile")
    .post(jwtMidleware, checkPer("UPDATE_PROFILE"), updateIterSchema, updateProfile);
