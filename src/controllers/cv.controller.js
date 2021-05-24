import mongo from 'mongoose';
import { HttpError } from '../utils';
import { CvService, IterService } from '../services';
import { Cv } from '../models';
const cvService = new CvService();
const iterService = new IterService();

/**
 * @api {post} /api/v1/cv create cv
 * @apiName Create cv
 * @apiGroup Cv
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} skill tech skill
 * @apiParam {String} softSkill soft Skill's jcv
 * @apiParam {String} experience experience's cv
 * @apiParam {String} description description's cv
 * @apiParam {String} birthday birthday's iter
 * @apiParam {String} image link image's cv
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Create cv successfully"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */
const createCv = async (req, res, next) => {
	const { _id } = req.user;
	let { skill, softSkill, experience, description, birthday, image } = req.body;
	try {
		const cvExist = await Cv.findOne({ iterId: _id });
		if (cvExist) throw new HttpError('You already have cv', 400);
		const user = await iterService.getIter(_id);
		if (!user) throw new HttpError('Iter not found', 400);
		const { email, name } = user;
		const data = {
			iterId: _id,
			skill,
			name: name,
			softSkill,
			experience,
			description,
			email,
			birthday,
			image,
		};
		await cvService.create(data);
		res.status(200).json({
			status: 200,
			msg: 'Create cv successfully',
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {get} /api/v1/cv/:id get a cv
 * @apiName Get a cv
 * @apiGroup Cv
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccess {Object} cv
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *         "cv": {
                "skill": [
                    "C++"
                ],
                "receiveMail": false,
                "_id": "605a9e1afcedab20d405cc4c",
                "iterId": "605a9df9fcedab20d405cc44",
                "name": "nam le",
                "softSkill": "Good community",
                "experience": "1 nam kn c++",
                "description": "la mot nguoi tot",
                "email": "it1@gmail.com"
            }
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */
const getCv = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!mongo.Types.ObjectId.isValid(id)) {
			throw new HttpError('id is invalid', 400);
		}
		const cv = await cvService.getCv(id);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			cv,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {get} /api/v1/cv/user get a cv by iter
 * @apiName Get a cv by iter
 * @apiGroup Cv
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccess {Object} cv
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *         "cv": {
 *               "skill": C++",
 *              "receiveMail": false,
 *               "_id": "605a9e1afcedab20d405cc4c",
 *               "iterId": "605a9df9fcedab20d405cc44",
 *               "name": "nam le",
 *               "softSkill": "Good community",
 *               "experience": "1 nam kn c++",
 *               "description": "la mot nguoi tot",
 *               "email": "it1@gmail.com"
 *           }
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */
const getCvByIter = async (req, res, next) => {
	const { _id } = req.user;
	try {
		const cv = await cvService.getCvByUser(_id);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			cv,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @api {patch} /api/v1/cv update cv
 * @apiName Update cv
 * @apiGroup Cv
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} skill tech skill
 * @apiParam {String} name name iter
 * @apiParam {String} email email iter
 * @apiParam {String} softSkill soft Skill's cv
 * @apiParam {String} experience experience's cv
 * @apiParam {String} description description's cv
 * @apiParam {String} birthday birthday's iter
 * @apiParam {String} image link image's cv
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
const updateCv = async (req, res, next) => {
	const { _id } = req.user;

	try {
		if (!(await cvService.update(_id, req.body))) throw new HttpError('Cv not found', 400);
		res.status(200).json({
			status: 200,
			msg: 'Update success',
		});
	} catch (error) {
		next(error);
	}
};

export const cvController = { createCv, getCv, getCvByIter, updateCv };
