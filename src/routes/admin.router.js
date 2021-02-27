import { adminController } from "../controllers";
import { validateRequestBody, authMiddleware, roleMiddleware } from "../middlewares";
import { Router } from "express";
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
const { createModSchema, loginAdminSchema } = validateRequestBody;
const { registerAdmin, createMod, login } = adminController;

export const adminRouter = Router();

adminRouter.route("/api/v1/admin/register-admin").post(registerAdmin); // private

adminRouter.route("/api/v1/admin/login").post(loginAdminSchema, login);

adminRouter
    .route("/api/v1/admin/create-mod")
    .post(jwtMidleware, checkPer("CREATE_MOD"), createModSchema, createMod); //  CREATE_MOD
