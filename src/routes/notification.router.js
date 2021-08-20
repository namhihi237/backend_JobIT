import { notificationController } from '../controllers';
import { authMiddleware, roleMiddleware } from '../middlewares';

import { Router } from 'express';

export const notificationRouter = Router();

notificationRouter
	.route('/api/v1/notifications')
	.get(authMiddleware.jwtMidleware, notificationController.notifications);

notificationRouter
	.route('/api/v1/notifications/number')
	.get(authMiddleware.jwtMidleware, notificationController.numberOfNotifications);

notificationRouter.route('/api/v1/notifications/reset').post(authMiddleware.jwtMidleware, notificationController.reset);
