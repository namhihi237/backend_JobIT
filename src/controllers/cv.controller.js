import { ITer, Cv, Company } from "../models";
import { HttpError } from "../utils";

/**
 * @api {post} /api/v1/cv create cv
 * @apiName Create cv
 * @apiGroup Cv
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {Array} skill vd : ["java","nodejs"]
 * @apiParam {String} linkGit linkGit's cv
 * @apiParam {String} personalSkill personalSkill's jcv
 * @apiParam {String} education education's cv
 * @apiParam {String} experience experience's cv
 * @apiParam {String} description description's cv
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
const createCv = async (req, res, next) => {
    const { _id } = req.user;
    let { linkGit, skill, personalSkill, education, experience, description } = req.body;
    try {
        const user = await ITer.findOne({ accountId: _id });
        const { email, fullName } = user;
        await Cv.create({
            iterId: _id,
            linkGit,
            skill,
            iterName: fullName,
            personalSkill,
            education,
            experience,
            description,
            email,
        });
        res.status(200).json({
            status: 200,
            msg: "Create new Cv success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {get} /api/v1/cv/receive-mail register receive email
 * @apiName Register receive email
 * @apiGroup Cv
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Register receive email"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */
const receiveMail = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const cv = await Cv.findOneAndUpdate({ iterId: _id }, { receiveMail: true });
        if (!cv) throw new HttpError("You are not have cv", 400);
        res.status(200).json({
            status: 200,
            msg: "Register receive email ",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {get} /api/v1/cv/cancel-receive-mail cancel receive email
 * @apiName Cancel receive email
 * @apiGroup Cv
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Register receive email"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */
const cancelReceiveMail = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const cv = await Cv.findOneAndUpdate({ iterId: _id }, { receiveMail: false });
        if (!cv) {
            throw new HttpError("You are not have cv", 400);
        }
        res.status(200).json({
            status: 200,
            msg: "Cancel receive email ",
        });
    } catch (error) {
        next(error);
    }
};

export const cvController = { createCv, receiveMail, cancelReceiveMail };