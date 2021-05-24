import mongo from 'mongoose';
import { HttpError } from '../utils';
import { CompanyService } from '../services';
const companyService = new CompanyService();

/**
 * @api {get} /api/v1/companies get all companies
 * @apiName get all companies
 * @apiGroup Company 
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiQuery {Number} page Number of page
 * @apiQuery {Number} take The number of records per page
 *
 * @apiExample {bash} Curl example
 * curl -H "Authorization: token 5f048fe" -i https://api.example.com/api/v1/companies?page=2&take=3
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Object} data
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 * 			"data": {
            "page": 1,
            "numPages": 1,
            "result": [
                {
                    "_id": "606491e8831e840015befef9",
                    "name": "Madison Technology ",
                    "accountId": "606491e7831e840015befeee",
                    "email": "com1@gmail.com",
                    "createdAt": "2021-03-31T15:14:48.629Z",
                }
            ]
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission",
    }
 */
const getCompanies = async (req, res, next) => {
	const { take, page } = req.query;

	try {
		const data = await companyService.getCompanies(page, take);
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
 * @api {delete} /api/v1/companies/:id delete a company
 * @apiName delete a company
 * @apiGroup Company
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
const deleteCompany = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!mongo.Types.ObjectId.isValid(id)) throw new HttpError('Id incorrect', 401);
		if (!(await companyService.deleteCompany(id))) throw new HttpError('Company not found', 400);
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {get} /api/v1/companies/info get info all companies
 * @apiName get info all companies
 * @apiGroup Company
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiQuery {Number} page Number of page
 * @apiQuery {Number} take The number of records per page
 * @apiExample {bash} Curl example
 * curl -H "Authorization: token 5f048fe" -i https://api.example.com/api/v1/companies/info?page=2&take=3
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Object} data
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
			"data": {
				"page": 1,
				"numPages": 1,
				"result": [
				{
					"recruitingPost": 6,
					"_id": "606491e8831e840015befef9",
					"accountId": "606491e7831e840015befeee",
					"email": "com1@gmail.com",
					"image": "http://res.cloudinary.com/do-an-cnpm/image/upload/v1620669960/dxkffb9kic51ylcmxm3b.jpg",
					"phone": "0989402047",
					"address": "Hà Nội",
					"name": "Nam's Company"
				},
				{
					"recruitingPost": 4,
					"_id": "6080de64035f0700159c8582",
					"accountId": "6080de64035f0700159c8577",
					"email": "com1@gmail.com",
					"image": "http://res.cloudinary.com/do-an-cnpm/image/upload/v1620669960/dxkffb9kic51ylcmxm3b.jpg",
					"phone": "0989402047",
					"address": "Hà Nội",
					"name": "Nam's Company"
				},
			]
 *     }
 */
const getCompaniesInfo = async (req, res, next) => {
	const { take, page, query } = req.query;
	try {
		const data = await companyService.getInfoCompanies(page, take, query);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};

export const companyController = {
	getCompanies,
	deleteCompany,
	getCompaniesInfo,
};
