import { Router } from "express";
import { cvController } from "../controllers";
import {
    validateRequestBody,
    authMiddleware,
    roleMiddleware,
} from "../middlewares";
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
const { createCvSchema } = validateRequestBody;
const { createCv, receiveMail, getCv } = cvController;

export const cvRouter = Router();

cvRouter
    .route("/api/v1/cv")
    .post(jwtMidleware, checkPer("CREATE_CV"), createCvSchema, createCv);

cvRouter.route("/api/v1/cv/:id").get(jwtMidleware, checkPer("GET_CV"), getCv);

cvRouter
    .route("/api/v1/cv/receive-mail")
    .get(jwtMidleware, checkPer("RECEIVE_MAIL"), receiveMail);
