import { imageController } from '../controllers';
import { authMiddleware } from '../middlewares';
import { Router } from 'express';
const { jwtMidleware } = authMiddleware;

export const imageRouter = Router();

imageRouter.route('/api/v1/images').get(jwtMidleware, imageController.uploadImageProfile);
