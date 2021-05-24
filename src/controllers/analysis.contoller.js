import mongo from 'mongoose';
import { HttpError } from '../utils';
import { AnalysisService } from '../services';

const analysisService = new AnalysisService();

/**
 * @api {get} /api/v1/analysis/post analysis post
 * @apiName nalysis post
 * @apiGroup Analysis
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiQuery {Number} year 
 * @apiExample {bash} Curl example
 * curl -H "Authorization: token 5f048fe" -i https://api.example.com/api/v1/analysis/post?year=2021
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Array} data <code>data</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
    "status": 200,
    "msg": "Success",
    "data": [
        1,
        0,
        0,
        1,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]
}
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */
const analysisOfPost = async (req, res, next) => {
	const { year } = req.query;
	try {
		const data = await analysisService.post(year);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};

const analysisOfSkill = async (req, res, next) => {
	const { year } = req.query;
	try {
		const data = await analysisService.post(year);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};

export const analysisController = {
	analysisOfPost,
	analysisOfSkill,
};
