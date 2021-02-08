import { Router } from "express";
import { companyController } from "../controllers";
import { validateRequestBody, authMiddleware, roleMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;
const { getProfilePer, updateProfilePer } = roleMiddleware;
const { updateCompanySchema } = validateRequestBody;
const { getProfile, updateProfile } = companyController;

export const companyRouter = Router();

companyRouter.route("/api/v1/company/profile").get(jwtMidleware, getProfilePer, getProfile);

companyRouter
    .route("/api/v1/company/profile")
    .post(jwtMidleware, updateProfilePer, updateCompanySchema, updateProfile);
