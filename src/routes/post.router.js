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
} = postController;

export const postRouter = Router();

postRouter.route("/api/v1/posts/accept").get(getAcceptedPosts);

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
    .get(jwtMidleware, checkPer("ACCEPT_COMPANY_POST"), getCompanyPost); // ACCEPT_COMPANY_POST
