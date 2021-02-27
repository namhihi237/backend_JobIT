import { Router } from "express";
import { companyController } from "../controllers";
import { validateRequestBody, authMiddleware, roleMiddleware } from "../middlewares";
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
const { updateCompanySchema } = validateRequestBody;
const { getProfile, updateProfile } = companyController;

export const companyRouter = Router();

companyRouter
    .route("/api/v1/company/profile")
    .get(jwtMidleware, checkPer("VIEW_PROFILE"), getProfile); // VIEW_PROFILE

companyRouter
    .route("/api/v1/company/profile")
    .post(jwtMidleware, checkPer("UPDATE_PROFILE"), updateCompanySchema, updateProfile); //UPDATE_PROFILE
