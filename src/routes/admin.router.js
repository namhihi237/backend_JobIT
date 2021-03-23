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
const {
    registerAdmin,
    createMod,
    login,
    getPermissions,
    getUserPermission,
    updatePermission,
    updateUserPermission,
} = adminController;

export const adminRouter = Router();

adminRouter.route("/api/v1/admin/register").post(registerAdmin); // private

adminRouter.route("/api/v1/admin/login").post(loginAdminSchema, login);

adminRouter
    .route("/api/v1/mod")
    .post(jwtMidleware, checkPer("CREATE_MOD"), createModSchema, createMod); //  CREATE_MOD

adminRouter
    .route("/api/v1/permissions")
    .get(jwtMidleware, checkPer("GET_PERMISSIONS"), getPermissions); //  GET_PERMISSIONS

adminRouter
    .route("/api/v1/users/:id/permissions")
    .get(jwtMidleware, checkPer("GET_USER_PERMISSIONS"), getUserPermission); //  GET_USER_PERMISSIONS

adminRouter.route("/api/v1/permissions").put(jwtMidleware, updatePermission); //  UPDATE_PERMISSIONS

adminRouter
    .route("/api/v1/users/:id/permissions")
    .put(jwtMidleware, updateUserPermission); //  UPDATE_USER_PERMISSIONS
