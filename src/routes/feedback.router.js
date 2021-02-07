import { feedbackCotroller } from "../controllers";
import { validateRequestBody, authMiddleware, roleMiddleware } from "../middlewares";
import { Router } from "express";
const { jwtMidleware } = authMiddleware;
const { createFeebackper, getFeebackper, deleteFeebackper } = roleMiddleware;
const { createFeedbackSchema } = validateRequestBody;
const { getFeedbacks, createFeedback, deleteFeedback } = feedbackCotroller;

export const feedbackRouter = Router();

feedbackRouter.route("/api/v1/feedbacks").get(jwtMidleware, getFeebackper, getFeedbacks);

feedbackRouter
    .route("/api/v1/feedbacks")
    .post(jwtMidleware, createFeebackper, createFeedbackSchema, createFeedback);

feedbackRouter.route("/api/v1/feedbacks").delete(jwtMidleware, deleteFeebackper, deleteFeedback);
