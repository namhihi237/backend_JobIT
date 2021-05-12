import { Router } from 'express';
import constant from '../constant';
const { ACTION_CODE } = constant;
import { companyController } from '../controllers';
import { validateRequestBody, authMiddleware, roleMiddleware } from '../middlewares';
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
const { updateCompanySchema } = validateRequestBody;

export const companyRouter = Router();

companyRouter
	.route('/api/v1/companies/:id')
	.delete(jwtMidleware, checkPer(ACTION_CODE.DELETE_USER), companyController.deleteCompany); // DELETE_USER

companyRouter
	.route('/api/v1/companies')
	.get(jwtMidleware, checkPer(ACTION_CODE.GET_USERS), companyController.getCompanies); //GET_USERS

companyRouter.route('/api/v1/companies/info').get(jwtMidleware, companyController.getCompaniesInfo);
