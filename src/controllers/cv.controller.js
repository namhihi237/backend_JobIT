import mongo from "mongoose";
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
 * @apiParam {String} personalSkill personalSkill's jcv
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
    let { skill, personalSkill, experience, description } = req.body;
    try {
        const user = await ITer.findOne({ accountId: _id });
        const { email, fullName } = user;
        await Cv.create({
            iterId: _id,
            skill,
            iterName: fullName,
            personalSkill,
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
 * @api {get} /api/v1/cv/receive-mail?receive register/cancel receive email
 * @apiName Register/cancel receive email
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
    const { receive } = req.query;
    const { _id } = req.user;
    try {
        const cv = await Cv.findOneAndUpdate(
            { iterId: _id },
            { receiveMail: receive }
        );
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
                "iterName": "nam le",
                "personalSkill": "Good community",
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
            throw new HttpError("id is invalid", 400);
        }
        const cv = await Cv.findById(
            { _id: id },
            { createdAt: 0, updatedAt: 0, __v: 0 }
        );
        res.status(200).json({
            status: 200,
            msg: "Success",
            cv,
        });
    } catch (error) {
        next(error);
    }
};

export const cvController = { createCv, receiveMail, getCv };
