import { feedbackCotroller } from "../controllers";
import { validateRequestBody, authMiddleware, roleMiddleware } from "../middlewares";
import { Router } from "express";
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
const { createFeedbackSchema } = validateRequestBody;
const { getFeedbacks, createFeedback, deleteFeedback } = feedbackCotroller;

export const feedbackRouter = Router();

feedbackRouter
    .route("/api/v1/feedbacks")
    .get(jwtMidleware, checkPer("VIEW_FEEDBACKS"), getFeedbacks);

feedbackRouter
    .route("/api/v1/feedbacks")
    .post(jwtMidleware, checkPer("CREATE_FEEDBACK"), createFeedbackSchema, createFeedback);

feedbackRouter
    .route("/api/v1/feedbacks")
    .delete(jwtMidleware, checkPer("DELETE_FEEDBACK"), deleteFeedback);
