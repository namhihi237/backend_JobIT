import mongo from 'mongoose';
import { Post, Company } from '../models';
import { HttpError } from '../utils';
import { PostService, CvService } from '../services';
const postService = new PostService();
const cvService = new CvService();
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
			accountId: _id,
			companyId: company._id,
			title,
			// name: company.name,
			skill,
			address,
			salary,
			endTime,
			description,
			// logo: company.image,
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
 *            "name": "FPT",
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
 *            "name": "FPT",
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
	const { skill, address, salary, endTime, description, title } = req.body;
	try {
		if (!mongo.Types.ObjectId.isValid(postId)) throw new HttpError('Not found post!', 400);

		const postWithUser = await Post.findOne({ accountId: _id, _id: postId }, { __v: 1 });
		if (!postWithUser) throw new HttpError('Deny update!', 401);

		const data = { skill, address, salary, endTime, description, title };
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
 *        "posts": [
        {
            "_id": "608bc604e78f864568466972",
            "skill": [
                "C#",
                "Python"
            ],
            "accept": true,
            "accountId": "606491e7831e840015befeee",
            "companyId": "606491e8831e840015befef9",
            "title": "Recruiting Dev ops ",
            "address": "Ha Noi",
            "salary": "1000 - 2000 $",
            "endTime": "2021-05-29",
            "description": "1 years experience python",
            "company": [
                {
                    "_id": "606491e8831e840015befef9",
                    "accountId": "606491e7831e840015befeee",
                    "email": "com1@gmail.com",
                    "createdAt": "2021-03-31T15:14:48.629Z",
                    "updatedAt": "2021-05-03T09:25:42.134Z",
                    "__v": 0,
                    "image": "http://res.cloudinary.com/do-an-cnpm/image/upload/v1619978750/w9xmdsqzl3oipdyy1wbp.jpg",
                    "phone": "0989402047",
                    "address": "Hà Nội",
                    "name": "Madison"
                }
            ]
        },
        {
            "_id": "608bc61fe78f864568466973",
            "skill": [
                "C#",
                "Python"
            ],
            "accept": true,
            "accountId": "606491e7831e840015befeee",
            "companyId": "606491e8831e840015befef9",
            "title": "Recruiting Dev ops ",
            "address": "Da Nang",
            "salary": "2000 - 3000 $",
            "endTime": "29/5/2021",
            "description": "10 years experience python",
            "company": [
                {
                    "_id": "606491e8831e840015befef9",
                    "accountId": "606491e7831e840015befeee",
                    "email": "com1@gmail.com",
                    "createdAt": "2021-03-31T15:14:48.629Z",
                    "updatedAt": "2021-05-03T09:25:42.134Z",
                    "__v": 0,
                    "image": "http://res.cloudinary.com/do-an-cnpm/image/upload/v1619978750/w9xmdsqzl3oipdyy1wbp.jpg",
                    "phone": "0989402047",
                    "address": "Hà Nội",
                    "name": "Madison"
                }
            	]	
        	},
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
		console.log(error);
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
		const cv = await cvService.getCvByUser(iterId);
		if (!cv) {
			throw new HttpError('Please create cv before using this feature', 400);
		}
		if (!(await postService.getPost(_id))) throw new HttpError('Post not found!', 400);
		if (!(await postService.applyPost(_id, iterId, cv._id)))
			throw new HttpError('You have already applied it before', 400);
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
		const post = await postService.getPost(_id);
		if (!post) throw new HttpError('Post not found!', 400);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			applies,
			title: post.title,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {get} /api/v1/posts/{postId}/detail get post by Id
 * @apiName get post by Id
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Object} post <code> post</code> show post
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
		* "post": {
				"_id": "608bc604e78f864568466972",
				"skill": [
					"C#",
					"Python"
				],
				"accept": true,
				"accountId": "606491e7831e840015befeee",
				"companyId": "606491e8831e840015befef9",
				"title": "Recruiting Dev ops ",
				"address": "Ha Noi",
				"salary": "1000 - 2000 $",
				"endTime": "2021-05-29",
				"description": "1 years experience python",
				"company": [
					{
						"_id": "606491e8831e840015befef9",
						"accountId": "606491e7831e840015befeee",
						"email": "com1@gmail.com",
						"createdAt": "2021-03-31T15:14:48.629Z",
						"updatedAt": "2021-05-03T09:25:42.134Z",
						"__v": 0,
						"image": "http://res.cloudinary.com/do-an-cnpm/image/upload/v1619978750/w9xmdsqzl3oipdyy1wbp.jpg",
						"phone": "0989402047",
						"address": "Hà Nội",
						"name": "Madison"
					}
				]
			}
 *     }
 */
const getPost = async (req, res, next) => {
	const { postId } = req.params;
	try {
		const posts = await postService.getPost(postId);
		if (!posts || posts.length == 0) throw new HttpError('Post not found!', 400);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			post: posts[0],
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {get} /api/v1/posts/company/:companyId get post list of the company
 * @apiName get post list of the company
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Array} posts <code> posts</code> show list posts
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
		  "posts": [
			{
				"skill": [
					"C#",
					"Python"
				],
				"_id": "608bc604e78f864568466972",
				"accountId": "606491e7831e840015befeee",
				"title": "Recruiting Dev ops ",
				"address": "Ha Noi",
				"salary": "1000 - 2000 $",
				"endTime": "2021-05-29",
				"description": "1 years experience python"
			},
			{
				"skill": [
					"C#",
					"Python"
				],
				"_id": "608bc61fe78f864568466973",
				"accountId": "606491e7831e840015befeee",
				"title": "Recruiting Dev ops ",
				"address": "Da Nang",
				"salary": "2000 - 3000 $",
				"endTime": "29/5/2021",
				"description": "10 years experience python"
			},
 *     }
 */
const getPostsByCompanyId = async (req, res, next) => {
	const { companyId } = req.params;
	try {
		const posts = await postService.listPostsByCompanyId(companyId);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			posts,
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
	getPost,
	getPostsByCompanyId,
};
