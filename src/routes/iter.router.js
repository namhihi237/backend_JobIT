import { Router } from "express";
import { iterController } from "../controllers";
import {
    validateRequestBody,
    authMiddleware,
    roleMiddleware,
} from "../middlewares";
import constant from "../constant";
const { ACTION_CODE } = constant;
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;

export const iterRouter = Router();

iterRouter
    .route("/api/v1/iters/profile")
    .get(
        jwtMidleware,
        checkPer(ACTION_CODE.VIEW_PROFILE),
        iterController.getUserProfile
    );

iterRouter
    .route("/api/v1/iters")
    .get(
        jwtMidleware,
        checkPer(ACTION_CODE.GET_USERS),
        iterController.getIters
    );

iterRouter
    .route("/api/v1/iters/:id")
    .delete(
        jwtMidleware,
        checkPer(ACTION_CODE.DELETE_USER),
        iterController.deleteIter
    );

iterRouter
    .route("/api/v1/iters/profile")
    .post(
        jwtMidleware,
        checkPer(ACTION_CODE.UPDATE_PROFILE),
        validateRequestBody.updateIterSchema,
        iterController.updateProfile
    );
