import { permissionController } from "../controllers";
import { authMiddleware, roleMiddleware } from "../middlewares";
import { Router } from "express";
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
const {
    getPermissions,
    getUserPermission,
    updatePermission,
    updateUserPermission,
} = permissionController;

export const permissionRouter = Router();

permissionRouter
    .route("/api/v1/permissions")
    .get(jwtMidleware, checkPer("GET_PERMISSIONS"), getPermissions); //  GET_PERMISSIONS

permissionRouter
    .route("/api/v1/users/:id/permissions")
    .get(jwtMidleware, checkPer("GET_USER_PERMISSIONS"), getUserPermission); //  GET_USER_PERMISSIONS

permissionRouter
    .route("/api/v1/permissions")
    .put(jwtMidleware, checkPer("UPDATE_PERMISSIONS"), updatePermission); //  UPDATE_PERMISSIONS

permissionRouter
    .route("/api/v1/users/:id/permissions")
    .put(jwtMidleware, updateUserPermission); //  UPDATE_USER_PERMISSIONS
