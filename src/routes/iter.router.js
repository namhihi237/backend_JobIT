import { Router } from 'express';
import { iterController } from '../controllers';
import { validateRequestBody, authMiddleware, roleMiddleware } from '../middlewares';
import constant from '../constant';
const { ACTION_CODE } = constant;
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;

export const iterRouter = Router();

iterRouter
	.route('/api/v1/iters')
	.get(jwtMidleware, checkPer(ACTION_CODE.GET_USERS), iterController.getIters);

iterRouter
	.route('/api/v1/iters/:id')
	.delete(jwtMidleware, checkPer(ACTION_CODE.DELETE_USER), iterController.deleteIter);
