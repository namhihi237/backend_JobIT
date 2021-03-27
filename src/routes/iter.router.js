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
const { getUserProfile, updateProfile, getIters, deleteIter } = iterController;

export const iterRouter = Router();

iterRouter
    .route("/api/v1/iters/profile")
    .get(jwtMidleware, checkPer("VIEW_PROFILE"), getUserProfile);

iterRouter
    .route("/api/v1/iters")
    .get(jwtMidleware, checkPer("GET_USERS"), getIters); //GET_USERS

iterRouter
    .route("/api/v1/iters/:id")
    .delete(jwtMidleware, checkPer("DELETE_USER"), deleteIter); //DELETE_USER

iterRouter
    .route("/api/v1/iters/profile")
    .post(
        jwtMidleware,
        checkPer("UPDATE_PROFILE"),
        updateIterSchema,
        updateProfile
    );
