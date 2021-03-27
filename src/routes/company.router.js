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
const {
    getProfile,
    updateProfile,
    getCompanys,
    deleteCompany,
} = companyController;

export const companyRouter = Router();

companyRouter
    .route("/api/v1/companys/profile")
    .get(jwtMidleware, checkPer("VIEW_PROFILE"), getProfile); // VIEW_PROFILE

companyRouter
    .route("/api/v1/companys/:id")
    .delete(jwtMidleware, checkPer("DELETE_USER"), deleteCompany); // DELETE_USER

companyRouter
    .route("/api/v1/companys/profile")
    .post(
        jwtMidleware,
        checkPer("UPDATE_PROFILE"),
        updateCompanySchema,
        updateProfile
    ); //UPDATE_PROFILE

companyRouter
    .route("/api/v1/companys")
    .get(jwtMidleware, checkPer("GET_USERS"), getCompanys); //GET_USERS
