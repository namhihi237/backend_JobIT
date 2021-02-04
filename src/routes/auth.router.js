import { Router } from "express";
import { authController } from "../controllers";
import { validateRequestBody } from "../middlewares";

const { registerITerSchema, registerCompanySchema, loginSchema } = validateRequestBody;
const { registerIter, registerCompany, login } = authController;

export const authRouter = Router();

authRouter.route("/api/v1/auth/register-iter").post(registerITerSchema, registerIter);

authRouter.route("/api/v1/auth/register-company").post(registerCompanySchema, registerCompany);

authRouter.route("/api/v1/auth/login").post(loginSchema, login);
