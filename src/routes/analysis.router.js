import { analysisController } from '../controllers';
import { authMiddleware, roleMiddleware } from '../middlewares';
import constant from '../constant';
const { ACTION_CODE } = constant;

import { Router } from 'express';
const { checkPer } = roleMiddleware;

export const analysisRouter = Router();

analysisRouter.route('/api/v1/analysis/post').get(authMiddleware.jwtMidleware, analysisController.analysisOfPost);

analysisRouter.route('/api/v1/analysis/skill').get(authMiddleware.jwtMidleware, analysisController.analysisOfSkill);
