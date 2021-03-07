import { postController } from "../controllers";
import { validateRequestBody, authMiddleware, roleMiddleware } from "../middlewares";

import { Router } from "express";

const { jwtMidleware } = authMiddleware;
const { checkPer } = roleMiddleware;
const { createPostSchema } = validateRequestBody;
const {
    createPost,
    getAcceptedPosts,
    getPostsNeedAccept,
    updatePost,
    deletePost,
    acceptPost,
    getCompanyPost,
    applyJob,
    listApply,
} = postController;

export const postRouter = Router();

postRouter.route("/api/v1/posts").get(getAcceptedPosts);

postRouter
    .route("/api/v1/posts/need-accept")
    .get(jwtMidleware, checkPer("VIEW_POSTS_NEED_ACCEPT"), getPostsNeedAccept); // VIEW_POSTS_NEED_ACCEPT

postRouter
    .route("/api/v1/posts")
    .post(jwtMidleware, checkPer("CREATE_POST"), createPostSchema, createPost); // CREATE_POST

postRouter
    .route("/api/v1/posts/:postId")
    .put(jwtMidleware, checkPer("UPDATE_POST"), createPostSchema, updatePost); // UPDATE_POST

postRouter.route("/api/v1/posts/:postId").delete(jwtMidleware, checkPer("DELETE_POST"), deletePost); // DELETE_POST

postRouter
    .route("/api/v1/posts/:postId/accept-post")
    .patch(jwtMidleware, checkPer("ACCEPT_POST"), acceptPost); // ACCEPT_POST

postRouter
    .route("/api/v1/posts/company")
    .get(jwtMidleware, checkPer("GET_COMPANY_POST"), getCompanyPost); // GET_COMPANY_POST

postRouter.route("/api/v1/posts/:_id/apply").get(jwtMidleware, applyJob); // APPLY_JOB

postRouter.route("/api/v1/posts/:_id/apply-list").get(listApply);
