import { modCotroller } from "../controllers";
import { validateRequestBody, authMiddleware, roleMiddleware } from "../middlewares";
import { Router } from "express";
const { jwtMidleware } = authMiddleware;
const { acceptPostPer } = roleMiddleware;
const {} = validateRequestBody;
const { acceptPost } = modCotroller;

export const modRouter = Router();
