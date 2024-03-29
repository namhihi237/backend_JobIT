import mongo from 'mongoose';
import { Post, Company } from '../models';
import { HttpError } from '../utils';
import { PostService, CvService, CompanyService, iterService } from '../services';
const postService = new PostService();
const cvService = new CvService();
const companyService = new CompanyService();

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
		const date = new Date(endTime.split('/').reverse().join('/'));
		if (date < new Date()) throw new HttpError('end time cannot less than now');
		const company = await Company.findOne({ accountId: _id });
		if (!company) throw new HttpError('Failed', 401);
		const data = {
			accountId: _id,
			companyId: company._id,
			title,
			name: company.name,
			skill,
			address,
			salary,
			endTime,
			description,
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
 *         posts : [
 *          "posts": [
            {
                "_id": "609cee9552522300152fd701",
                "skill": [
                    "ReactJS"
                ],
                "accountId": "609cab88c85020001578a9a9",
                "companyId": "609cab89c85020001578a9b0",
                "title": "Front-end Developer",
                "address": "Da Nang",
                "salary": "2000$",
                "endTime": "1/6/2021",
                "description": "Work for international customers\nWork with colleagues from Germany, France, the Czech Republic and the US\nBe responsible for the success of your project\nDesign, implement and test web applications\nCollaborate on requirement analysis and specifications\nShare knowledge and experience with your colleagues\nWorking time: 40 hours / week, flexible",
                "apply": [],
                "company": [
                    {
                        "name": "CES",
                        "accountId": "609cab88c85020001578a9a9",
                        "email": "ces@gmail.com",
                        "address": "Da Nang",
                        "image": "http://res.cloudinary.com/do-an-cnpm/image/upload/v1620895774/fw8o6u4nyi2vdzet8yh2.jpg",
                        "phone": "0123456789"
                    }
                ],
            },
 *          ......
 *         ]
 *     }
 */
const getAcceptedPosts = async (req, res, next) => {
	const { query, page, take } = req.query;
	try {
		const posts = await postService.getPosts(query, 'ACCEPTED', page, take);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data: posts,
		});
	} catch (error) {
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
		const data = await postService.getPosts(query, 'WAITING', page, take);
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
		const date = new Date(endTime.split('/').reverse().join('/'));
		if (date < new Date()) throw new HttpError('end time cannot less than now');

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
		if (!mongo.Types.ObjectId.isValid(postId)) throw new HttpError('PostID not found!', 400);
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
 * @api {patch} /api/v1/posts/{postId}/accept-post  accept post
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
 *       "msg": "Denny permission"
 *     }
 */

const acceptPost = async (req, res, next) => {
	const { postId } = req.params;
	try {
		if (!mongo.Types.ObjectId.isValid(postId)) throw new HttpError('Post not found!', 400);
		const check = await postService.acceptPost(postId);
		if (check == 0) throw new HttpError('Post not found!', 400);
		if (check == 1) throw new HttpError('Post has been accepted', 400);
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
 * @api {patch} /api/v1/posts/accept-many  accept many posts
 * @apiName Accept many posts
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {Array} listId list _id post need accept
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
 *       "msg": "Denny permission"
 *     }
 */
const acceptMany = async (req, res, next) => {
	const { listId } = req.body;
	try {
		if (listId && listId.length == 0) {
			throw new HttpError('List is empty', 400);
		}
		for (let i = 0; i < listId.length; i += 100) {
			let acceptList = listId.slice(i, i + 100).map((e) => {
				return postService.acceptPost(e);
			});
			await Promise.all(acceptList);
		}
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
            "status": "WAITING",
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
		const post = await postService.getPost(_id);
		if (post.length == 0) throw new HttpError('Post not found!', 400);
		console.log(post);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			applies: post[0].apply,
			title: post[0].title,
		});
	} catch (error) {
		console.log(error);
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
				"status": "WAITING",
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
		const company = await companyService.getCompany(companyId);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			company,
			posts,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {patch} /api/v1/posts/{postId}/complete  complete post
 * @apiName complete post
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
 *       "msg": "Denny permission"
 *     }
 */
const donePost = async (req, res, next) => {
	const { _id } = req.params;
	try {
		if (!(await postService.donePost(_id))) throw new HttpError('Post not found!', 400);
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {post} /api/v1/posts/{postId}/response-apply  response iter has apply
 * @apiName response iter
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 *@apiParamExample {json} Request-Example:
                 { 
				"listResponse" : [
					{
						"iterId": "61123eb11b85e832a85d4fd9",
						"status" : "agree"
					},
					{
						"iterId": "61123eb11b85e832a85d4fd9",
						"status" : "reject"
					}
				]
			}
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
 *       "msg": "Denny permission"
 *     }
 */
const responseListApply = async (req, res, next) => {
	const { postId } = req.params;
	const { listResponse } = req.body;
	const { _id } = req.user;
	try {
		if (!postId) throw new HttpError('Post not found!', 404);
		const post = await postService.getPost(postId);
		if (!post) throw new HttpError('Post not found!', 404);

		await postService.responseListApply(_id, postId, listResponse);

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
 * @api {get} /api/v1/posts/applied get all applied posts by iter
 * @apiName get all applied posts by iter
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
 *          posts : [
 *          {
 * 			"status": "agreed",
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
const listAppliedPosts = async (req, res, next) => {
	try {
		const userId = req.user._id;
		const posts = await postService.listAppliedPosts(userId);
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
 * @api {post} /api/v1/posts/saved  save post
 * @apiName save post
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} postId The id of the post to save.
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
 *       "msg": "Denny permission"
 *     }
 */
const savePost = async (req, res, next) => {
	const { postId } = req.body;
	const userId = req.user._id;
	try {
		const post = await postService.getPost(postId);
		if (!post) throw new HttpError('Post not found!', 404);
		const save = await postService.savePost(userId, postId);

		res.status(200).json({
			status: 200,
			msg: `You have successfully ${save ? 'saved' : 'un saved'}`,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {get} /api/v1/posts/saved  list saved posts
 * @apiName list saved posts
 * @apiGroup Post
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccess {Array} post list saved posts
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
		  "posts": [
			{
				"_id": "611b770ec59b1d001636626d",
				"iterId": "60a2341a4cc537001530a875",
				"postId": "6118cef9098ab10016619916",
				"post": {
					"_id": "6118cef9098ab10016619916",
					"skill": [
						"C#",
						"PHP"
					],
					"status": "ACCEPTED",
					"companyId": "60c813d60b0cc400154b8f73",
					"title": "Nodejs developer",
					"name": "Madison Technologies",
					"address": "HA Noi",
					"salary": "1500 - 2500 $",
					"endTime": "19/8/2021",
					"description": "EEEEEE",
					"apply": [
						{
							"iterId": "60a2341a4cc537001530a875"
						}
					],
					"company": [
						{
							"accountId": "60c813d50b0cc400154b8f6b",
							"image": "https://res.cloudinary.com/do-an-cnpm/image/upload/v1628150573/madison_kwqube.jpg"
						}
					]
				}
			},
		]
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */
const listSavedPosts = async (req, res, next) => {
	try {
		const posts = await postService.getSavedPosts(req.user._id);
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
	donePost,
	acceptMany,
	responseListApply,
	listAppliedPosts,
	listSavedPosts,
	savePost,
};
