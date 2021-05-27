import mongo from 'mongoose';
import { HttpError } from '../utils';
import { AnalysisService } from '../services';
const analysisService = new AnalysisService();

/**
 * @api {get} /api/v1/analysis/post analyze post
 * @apiName analyze post
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

/**
 * @api {get} /api/v1/analysis/skill analyze skill
 * @apiName analyze skill
 * @apiGroup Analysis
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiQuery {String} option 
 * @apiQuery {Number} year 
 * @apiQuery {Number} month 
 * @apiExample {bash} Curl example
 * curl -H "Authorization: token 5f048fe" -i https://api.example.com/api/v1/analysis/skill?option=month&month=5&year=2021
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Array} data <code>data</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
    "status": 200,
    "msg": "Success",
    "data": [
        {
            "C": 1
        },
        {
            "C++": 1
        },
        {
            "C#": 3
        },
        {
            "Java": 9
        },
        {
            "Javascript": 8
        },
        {
            "PHP": 1
        },
        {
            "Python": 6
        }
    ]
}
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */
const analysisOfSkill = async (req, res, next) => {
	const { option, year, month } = req.query;
	try {
		let data = [];
		if (option == 'month') data = await analysisService.skillForMonth(month, year);
		else if (option == 'year') data = await analysisService.skillForYear(year);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};

const analysisUser = async (req, res, next) => {
	try {
		const data = await analysisService.analysisUser();
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {get} /api/v1/analysis/user analyze user
 * @apiName analyze user
 * @apiGroup Analysis
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiQuery {String} option 
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Array} data <code>data</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 {
    "status": 200,
    "msg": "Success",
    "data": {
        "numberOfIter": 15,
        "numberOfCompany": 7
    }
}
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */
export const analysisController = {
	analysisOfPost,
	analysisOfSkill,
	analysisUser,
};
