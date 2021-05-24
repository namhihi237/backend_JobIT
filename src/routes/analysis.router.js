import { analysisController } from '../controllers';
import { validateRequestBody, authMiddleware, roleMiddleware } from '../middlewares';
import constant from '../constant';
const { ACTION_CODE } = constant;

import { Router } from 'express';
const { checkPer } = roleMiddleware;

export const analysisRouter = Router();

analysisRouter.route('/api/v1/analysis/post').get(authMiddleware.jwtMidleware, analysisController.analysisOfPost);
