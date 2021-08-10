import { notificationController } from '../controllers';
import { authMiddleware, roleMiddleware } from '../middlewares';
import constant from '../constant';
const { ACTION_CODE } = constant;

import { Router } from 'express';
const { checkPer } = roleMiddleware;

export const notificationRouter = Router();

notificationRouter
	.route('/api/v1/notifications')
	.get(authMiddleware.jwtMidleware, notificationController.notifications);
