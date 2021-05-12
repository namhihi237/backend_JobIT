import { postController } from '../controllers';
import { validateRequestBody, authMiddleware, roleMiddleware } from '../middlewares';

import { Router } from 'express';
import constant from '../constant';
const { ACTION_CODE } = constant;
const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;

export const postRouter = Router();

postRouter.route('/api/v1/posts').get(postController.getAcceptedPosts);

postRouter
	.route('/api/v1/posts/need-accept')
	.get(jwtMidleware, checkPer(ACTION_CODE.VIEW_POSTS_NEED_ACCEPT), postController.getPostsNeedAccept);

postRouter.route('/api/v1/posts/company/:companyId').get( postController.getPostsByCompanyId);

postRouter
	.route('/api/v1/posts/:postId/accept-post')
	.patch(jwtMidleware, checkPer(ACTION_CODE.ACCEPT_POST), postController.acceptPost);

postRouter
	.route('/api/v1/posts')
	.post(
		jwtMidleware,
		checkPer(ACTION_CODE.CREATE_POST),
		validateRequestBody.createPostSchema,
		postController.createPost,
	);

postRouter
	.route('/api/v1/posts/:postId')
	.put(
		jwtMidleware,
		checkPer(ACTION_CODE.UPDATE_POST),
		validateRequestBody.createPostSchema,
		postController.updatePost,
	);

postRouter
	.route('/api/v1/posts/:postId')
	.delete(jwtMidleware, checkPer(ACTION_CODE.DELETE_POST), postController.deletePost);

postRouter.route('/api/v1/posts/:postId/detail').get(postController.getPost);

postRouter
	.route('/api/v1/posts/company')
	.get(jwtMidleware, checkPer(ACTION_CODE.GET_COMPANY_POST), postController.getCompanyPost);

postRouter.route('/api/v1/posts/:_id/apply').get(jwtMidleware, postController.applyJob);

postRouter.route('/api/v1/posts/:_id/apply-list').get(postController.listApply);
