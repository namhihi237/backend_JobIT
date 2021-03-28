import { adminController } from "../controllers";
import {
    validateRequestBody,
    authMiddleware,
    roleMiddleware,
} from "../middlewares";
import { Router } from "express";
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
const { createModSchema, loginAdminSchema } = validateRequestBody;
const { registerAdmin, createMod, login, getMods, deleteMod } = adminController;

export const adminRouter = Router();

adminRouter.route("/api/v1/admin/register").post(registerAdmin); // private

adminRouter.route("/api/v1/admin/login").post(loginAdminSchema, login);

adminRouter
    .route("/api/v1/moderators")
    .post(jwtMidleware, checkPer("CREATE_MOD"), createModSchema, createMod); //  CREATE_MOD

adminRouter
    .route("/api/v1/moderators")
    .delete(jwtMidleware, checkPer("DELETE_USER"), deleteMod); //  DELETE_USER

adminRouter
    .route("/api/v1/moderators")
    .get(jwtMidleware, checkPer("GET_USERS"), getMods); //  GET_USERS
