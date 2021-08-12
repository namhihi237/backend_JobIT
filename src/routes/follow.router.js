import { followController } from '../controllers';
import { authMiddleware } from '../middlewares';
import { Router } from 'express';
const { jwtMidleware } = authMiddleware;

export const followRoute = Router();

followRoute.route('/api/v1/followers').post(jwtMidleware, followController.follow);

followRoute.route('/api/v1/followers/following').get(jwtMidleware, followController.getFollowing);
