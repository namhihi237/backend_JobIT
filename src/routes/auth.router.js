import { Router } from "express";
import { authController } from "../controllers";
import { validateRequestBody, authMiddleware, roleMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;
const { getProfilePer } = roleMiddleware;
const {
    registerITerSchema,
    registerCompanySchema,
    loginSchema,
    updatePassSchema,
} = validateRequestBody;
const { registerIter, registerCompany, login, updatePassword } = authController;

export const authRouter = Router();

authRouter.route("/api/v1/auth/register-iter").post(registerITerSchema, registerIter);

authRouter.route("/api/v1/auth/register-company").post(registerCompanySchema, registerCompany);

authRouter.route("/api/v1/auth/login").post(loginSchema, login);

authRouter
    .route("/api/v1/auth/update-password")
    .post(jwtMidleware, updatePassSchema, updatePassword);
