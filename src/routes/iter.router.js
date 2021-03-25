import { Router } from "express";
import { iterController } from "../controllers";
import {
    validateRequestBody,
    authMiddleware,
    roleMiddleware,
} from "../middlewares";
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
const { updateIterSchema } = validateRequestBody;
const { getUserProfile, updateProfile, getIters } = iterController;

export const iterRouter = Router();

iterRouter
    .route("/api/v1/iters/profile")
    .get(jwtMidleware, checkPer("VIEW_PROFILE"), getUserProfile);

iterRouter
    .route("/api/v1/iters")
    .get(jwtMidleware, checkPer("GET_ALL_ITERS"), getIters);

iterRouter
    .route("/api/v1/iters/profile")
    .post(
        jwtMidleware,
        checkPer("UPDATE_PROFILE"),
        updateIterSchema,
        updateProfile
    );
