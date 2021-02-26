import { Router } from "express";
import { cvController } from "../controllers";
import { validateRequestBody, authMiddleware, roleMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;
const {} = roleMiddleware;
const { createCvSchema } = validateRequestBody;
const { createCv, receiveMail, cancelReceiveMail } = cvController;

export const cvRouter = Router();

cvRouter.route("/api/v1/cv").post(jwtMidleware, createCvSchema, createCv);

cvRouter.route("/api/v1/cv/receive-mail").get(jwtMidleware, receiveMail);

cvRouter.route("/api/v1/cv/cancel-receive-mail").get(jwtMidleware, cancelReceiveMail);
