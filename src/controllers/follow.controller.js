import { CompanyService } from '../services';
const companyService = new CompanyService();
import { followerService } from '../services';

/**
 * @api {post} /api/v1/follows follow - un follow
 * @apiName follow - un follow
 * @apiGroup Follow
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} companyId The company id. (accountId)
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg Notification iter follow or un follow success
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "You have follow successfully",
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */

const follow = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const { companyId } = req.body;

		const company = await companyService.getCompany(companyId);
		if (!company) {
			throw new Error('Company not found', 400);
		}
		const follow = await followerService.follow(_id, companyId);
		res.status(200).json({
			status: 200,
			msg: `You have ${follow ? 'follow' : 'un follow'} successfully `,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {post} /api/v1/follows/following get all following
 * @apiName get all following
 * @apiGroup Follow
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg Success
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
            "following": [
            "61123e1f1b85e832a85d4fcf",
             "61123e1f1b85e832a85d4fcf"
            ]
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */

const getFollowing = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const following = await followerService.getFollowing(_id);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			following,
		});
	} catch (error) {
		next(error);
	}
};

export const followController = {
	follow,
	getFollowing,
};
