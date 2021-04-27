import mongo from 'mongoose';
import { Post, Company } from '../models';
import { HttpError } from '../utils';
import { PostService } from '../services';
const postService = new PostService();

/**
 * @api {post} /api/v1/posts company create post
 * @apiName Create post
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} title title's job
 * @apiParam {Array} skill vd : ["java","nodejs"]
 * @apiParam {String} address address's job
 * @apiParam {String} salary salary's job
 * @apiParam {String} endTime endTime's job
 * @apiParam {String} description description's job
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission create post"
 *     }
 */
const createPost = async (req, res, next) => {
	const { _id } = req.user;
	const { title, skill, address, salary, endTime, description } = req.body;
	try {
		const company = await Company.findOne({ accountId: _id });
		if (!company) throw new HttpError('Failed', 401);
		const data = {
			companyId: _id,
			title,
			companyName: company.companyName,
			skill,
			address,
			salary,
			endTime,
			description,
			logo: company.image,
		};
		await postService.create(data);

		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

/**
 * @api {get} /api/v1/posts get all accepted post
 * @apiName get accepted post
 * @apiGroup Post
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Array} posts <code>Array Objects post</code> show all post accept
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
         "currentPage": 2,
            "numPages": 2,
 *        posts : [
 *          {
 *           "skill": [
 *               "java",
 *               "nodejs"
 *           ],
 *           "comment": [],
 *           "_id": "601d12b5f391e21c38ea6bfe",
 *           "companyId": "601d07f259e12e126c0a2af4",
 *            "companyName": "FPT",
 *            "address": "1444 nlb",
 *            "salary": "1200 to 2000$",
 *            "endTime": "21/3/2021",
 *            "description": "nodejs >= 3 year experience",
 *            },
 *          ......
 *         ]
 *     }
 */
const getAcceptedPosts = async (req, res, next) => {
	const { query, page, take } = req.query;
	try {
		const posts = await postService.getPosts(query, true, page, take);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data: posts,
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

/**
 * @api {get} /api/v1/posts/need-accept get all post need  accept
 * @apiName get post need accept
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Array} posts <code>Array Objects post</code> show all post need accept
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *        status: 200,
 *        msg: "Success",
        data : {
            "currentPage": 2,
            "numPages": 2,
 *          posts : [
 *          {
 *           "skill": [
 *               "java",
 *               "nodejs"
 *           ],
 *           "comment": [],
 *           "_id": "601d12b5f391e21c38ea6bfe",
 *           "companyId": "601d07f259e12e126c0a2af4",
 *            "companyName": "FPT",
 *            "address": "1444 nlb",
 *            "salary": "1200 to 2000$",
 *            "endTime": "21/3/2021",
 *            "description": "nodejs >= 3 year experience",
 *             "createdAt": "2021-02-05T09:41:09.446Z"
 *            },
 *          ....
 *         ]
        }
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission create post"
 *     }
 */
const getPostsNeedAccept = async (req, res, next) => {
	const { query, take, page } = req.query;
	try {
		const data = await postService.getPosts(query, false, page, take);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			...data,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {put} /api/v1/posts/[postId] company update post
 * @apiName Update post
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {Array} skill vd : ["java","nodejs"]
 * @apiParam {String} address address's job
 * @apiParam {String} salary salary's job
 * @apiParam {String} endTime endTime's job
 * @apiParam {String} description description's job
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission update post"
 *     }
 */
const updatePost = async (req, res, next) => {
	const { _id } = req.user;
	const { postId } = req.params;
	const { skill, address, salary, endTime, description } = req.body;
	try {
		if (!mongo.Types.ObjectId.isValid(postId)) throw new HttpError('Not found post!', 400);

		const postWithUser = await Post.findOne({ companyId: _id, _id: postId }, { __v: 1 });
		if (!postWithUser) throw new HttpError('Deny update!', 401);

		const data = { skill, address, salary, endTime, description };
		if (!(await postService.update(postId, data))) throw new HttpError('Post not found', 404);
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {delete} /api/v1/posts/{postId}  delete post
 * @apiName Delete post
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission delete post"
 *     }
 */
const deletePost = async (req, res, next) => {
	const { postId } = req.params;
	try {
		if (!mongo.Types.ObjectId.isValid(postId)) throw new HttpError('PostID not found!', 404);
		if (!(await postService.deletePost(postId))) throw new HttpError('Post not found!', 400);
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {patch} /api/v1/posts/[postId]/accept-post  accept post
 * @apiName Accept post
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission accept post"
 *     }
 */

const acceptPost = async (req, res, next) => {
	const { postId } = req.params;
	try {
		if (!mongo.Types.ObjectId.isValid(postId)) throw new HttpError('Post not found!', 400);

		if (!(await postService.acceptPost(postId))) throw new HttpError('Post not found!', 400);
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {get} /api/v1/posts/company get company post
 * @apiName get company post
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Array} posts <code>Array Objects post</code> show all company post
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *        posts : [
 *          {
 *           "skill": [
 *               "java",
 *               "nodejs"
 *           ],
 *           "comment": [],
 *           "_id": "601d12b5f391e21c38ea6bfe",
 *           "companyId": "601d07f259e12e126c0a2af4",
 *            "companyName": "FPT",
 *            "address": "1444 nlb",
 *            "salary": "1200 to 2000$",
 *            "endTime": "21/3/2021",
 *            "description": "nodejs >= 3 year experience",
 *            },
 *          ......
 *         ]
 *     }
 */
const getCompanyPost = async (req, res, next) => {
	const { _id } = req.user;
	try {
		const posts = await postService.getCompanyPost(_id);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			posts,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {get} /api/v1/posts/{_id}/apply apply post
 * @apiName apply post
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 *     }
 */
const applyJob = async (req, res, next) => {
	const { _id } = req.params;
	const iterId = req.user._id;
	try {
		if (!(await postService.applyPost(_id, iterId))) throw new HttpError('you have already applied it before', 400);
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {get} /api/v1/posts/{_id}/apply-list list apply
 * @apiName list apply
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Array} applies <code>Array Objects post</code> show all list apply
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 *     }
 */

const listApply = async (req, res, next) => {
	const { _id } = req.params;
	try {
		const applies = await postService.listApply(_id);
		const post = await postService.getPost({_id });
		res.status(200).json({
			status: 200,
			msg: 'Success',
			applies,
			title : post.title
		});
	} catch (error) {
		next(error);
	}
};

export const postController = {
	createPost,
	getAcceptedPosts,
	getPostsNeedAccept,
	updatePost,
	deletePost,
	acceptPost,
	getCompanyPost,
	applyJob,
	listApply,
};
