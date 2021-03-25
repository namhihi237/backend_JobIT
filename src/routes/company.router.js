import { Router } from "express";
import { companyController } from "../controllers";
import {
    validateRequestBody,
    authMiddleware,
    roleMiddleware,
} from "../middlewares";
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
const { updateCompanySchema } = validateRequestBody;
const { getProfile, updateProfile, getCompanys } = companyController;

export const companyRouter = Router();

companyRouter
    .route("/api/v1/companys/profile")
    .get(jwtMidleware, checkPer("VIEW_PROFILE"), getProfile); // VIEW_PROFILE

companyRouter
    .route("/api/v1/companys/profile")
    .post(
        jwtMidleware,
        checkPer("UPDATE_PROFILE"),
        updateCompanySchema,
        updateProfile
    ); //UPDATE_PROFILE

companyRouter
    .get("/api/v1/companys")
    .get(jwtMidleware, checkPer("GET_ALL_COMPANYS"), getCompanys); // GET_ALL_COMPANYS
