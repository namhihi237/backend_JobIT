import { feedbackController } from '../controllers';
import { validateRequestBody, authMiddleware, roleMiddleware } from '../middlewares';
import { Router } from 'express';
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
import constant from '../constant';
const { ACTION_CODE } = constant;

export const feedbackRouter = Router();

feedbackRouter
	.route('/api/v1/feedbacks')
	.get(jwtMidleware, checkPer(ACTION_CODE.VIEW_FEEDBACKS), feedbackController.getFeedbacks);

feedbackRouter
	.route('/api/v1/feedbacks')
	.post(
		jwtMidleware,
		checkPer(ACTION_CODE.CREATE_FEEDBACK),
		validateRequestBody.createFeedbackSchema,
		feedbackController.createFeedback,
	);

feedbackRouter
	.route('/api/v1/feedbacks/feedbackId')
	.delete(jwtMidleware, checkPer(ACTION_CODE.DELETE_FEEDBACK), feedbackController.deleteFeedback);
