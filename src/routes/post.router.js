import { postController } from "../controllers";
import { validateRequestBody, authMiddleware, roleMiddleware } from "../middlewares";

import { Router } from "express";

const { jwtMidleware } = authMiddleware;
const { createPostPer, viewPostNeedAcceptPer, updatePostPer, deletePostPer } = roleMiddleware;
const { createPostSchema } = validateRequestBody;
const { createPost, getAcceptedPosts, getPostsNeedAccept, updatePost, deletePost } = postController;

export const postRouter = Router();

postRouter.route("/api/v1/posts/accept").get(getAcceptedPosts);

postRouter
    .route("/api/v1/posts/need-accept")
    .get(jwtMidleware, viewPostNeedAcceptPer, getPostsNeedAccept); // VIEW_POSTS_NEED_ACCEPT

postRouter.route("/api/v1/posts").post(jwtMidleware, createPostPer, createPostSchema, createPost); // CREATE_POST

postRouter
    .route("/api/v1/posts/:postId")
    .put(jwtMidleware, updatePostPer, createPostSchema, updatePost); // UPDATE_POST

postRouter.route("/api/v1/posts/:postId").delete(jwtMidleware, deletePostPer, deletePost); // DELETE_POST
