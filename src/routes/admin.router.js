import { adminController } from '../controllers';
import { validateRequestBody, authMiddleware, roleMiddleware } from '../middlewares';
import constant from '../constant';
const { ACTION_CODE } = constant;

import { Router } from 'express';
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;

export const adminRouter = Router();

adminRouter.route('/api/v1/admin/login').post(validateRequestBody.loginAdminSchema, adminController.login);

adminRouter
	.route('/api/v1/moderators')
	.post(
		jwtMidleware,
		checkPer(ACTION_CODE.CREATE_MOD),
		validateRequestBody.createModSchema,
		adminController.createMod,
	); //  CREATE_MOD

adminRouter
	.route('/api/v1/moderators/:id')
	.delete(jwtMidleware, checkPer(ACTION_CODE.DELETE_USER), adminController.deleteMod); //  DELETE_USER

adminRouter.route('/api/v1/moderators').get(jwtMidleware, checkPer(ACTION_CODE.GET_USERS), adminController.getMods); //  GET_USERS
