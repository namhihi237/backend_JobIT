import mongo from 'mongoose';
import { HttpError } from '../utils';
import { IterService } from '../services';
const iterService = new IterService();

/**
 * @api {get} /api/v1/iters get all iters
 * @apiName get all iters
 * @apiGroup Iter
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiQuery {Number} page Number of page
 * @apiQuery {Number} take The number of records per page
 *
 * @apiExample {bash} Curl example
 * curl -H "Authorization: token 5f048fe" -i https://api.example.com/api/v1/iters?page=2&take=3
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Object} data
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *         "data": {
                "page": 1,
                "numPages": 1,
                "result": [
                    {
                        "receiveMailJob": false,
                        "_id": "605af5b86bad1f00159d773f",
                        "name": "thang",
                        "accountId": "605af5b76bad1f00159d7738",
                        "email": "thang@gmail.com",
                        "createdAt": "2021-03-24T08:18:00.272Z",
                        "image": "https://res.cloudinary.com/do-an-cnpm/image/upload/v1617869793/ajdi4nvzeiasleeplveo.jpg"
                    },
                    {
                        "receiveMailJob": false,
                        "_id": "6062ad983bbee800153a7b80",
                        "name": "nam le",
                        "accountId": "6062ad973bbee800153a7b78",
                        "email": "it@gmail.com",
                        "createdAt": "2021-03-30T04:48:24.125Z",
                        "image": "https://res.cloudinary.com/do-an-cnpm/image/upload/v1617869793/ajdi4nvzeiasleeplveo.jpg"
                    },
                ]
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission update profile"
 *     }
 */
const getIters = async (req, res, next) => {
	const { page, take } = req.query;
	try {
		const data = await iterService.getIters(page, take);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

/**
 * @api {delete} /api/v1/iters/:id delete iter
 * @apiName delete iter
 * @apiGroup Iter
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission update profile"
 *     }
 */
const deleteIter = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!mongo.Types.ObjectId.isValid(id)) throw new HttpError('Id incorrect', 401);
		if (!(await iterService.deleteIter(id))) throw new HttpError('Iter not found', 400);
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {patch} /api/v1/iters/receive-mail register/cancel receive email
 * @apiName Register/cancel receive email
 * @apiGroup Iter
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {Boolean} receive
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "You have subscribed to receive email for job search"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */
const receiveMail = async (req, res, next) => {
	const { receive } = req.body;
	const { _id } = req.user;
	try {
		if (!(await iterService.registerSendEmail(_id, receive))) throw new HttpError('Iter not found', 400);
		let msg = receive
			? 'You have subscribed to receive email for job search'
			: 'You have unsubscribed from the job search email';
		res.status(200).json({
			status: 200,
			msg,
		});
	} catch (error) {
		next(error);
	}
};

export const iterController = {
	getIters,
	deleteIter,
	receiveMail,
};
