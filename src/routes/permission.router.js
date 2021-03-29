import { permissionController } from "../controllers";
import { authMiddleware, roleMiddleware } from "../middlewares";
import { Router } from "express";
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;

import constant from "../constant";
const { ACTION_CODE } = constant;
export const permissionRouter = Router();

permissionRouter
    .route("/api/v1/permissions")
    .get(
        jwtMidleware,
        checkPer(ACTION_CODE.GET_PERMISSIONS),
        permissionController.getPermissions
    );

permissionRouter
    .route("/api/v1/users/:id/permissions")
    .get(
        jwtMidleware,
        checkPer(ACTION_CODE.GET_USER_PERMISSIONS),
        permissionController.getUserPermission
    );

permissionRouter
    .route("/api/v1/permissions")
    .put(
        jwtMidleware,
        checkPer(ACTION_CODE.UPDATE_PERMISSIONS),
        permissionController.updatePermission
    );

permissionRouter
    .route("/api/v1/users/:id/permissions")
    .put(
        jwtMidleware,
        checkPer(ACTION_CODE.UPDATE_USER_PERMISSIONS),
        permissionController.updateUserPermission
    );
