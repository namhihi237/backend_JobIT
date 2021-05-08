import { Router } from 'express';
import { cvController } from '../controllers';
import constant from '../constant';
const { ACTION_CODE } = constant;
import { validateRequestBody, authMiddleware, roleMiddleware } from '../middlewares';
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;

export const cvRouter = Router();

cvRouter
	.route('/api/v1/cv')
	.post(jwtMidleware, checkPer(ACTION_CODE.CREATE_CV), validateRequestBody.createCvSchema, cvController.createCv);

cvRouter.route('/api/v1/cv/user').get(jwtMidleware, cvController.getCvByIter);

cvRouter.route('/api/v1/cv/:id').get(jwtMidleware, cvController.getCv);

cvRouter.route('/api/v1/cv').patch(jwtMidleware, cvController.updateCv);
