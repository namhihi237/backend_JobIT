import { envVariables } from "../configs";
import bcrypt from "bcryptjs";
import { tokenEncode, verifyToken, HttpError } from "../utils";
import mongo from "mongoose";
import { Company, Feedback, ITer } from "../models";

/**
 * @api {get} /api/v1/feedbacks get all feedbacks
 * @apiName get feedbacks
 * @apiGroup Feedback
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Array} feedbacks <code>Array Objects feedback</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *            "feedbacks": [
                    {
                        "_id": "601fc082633e8c3688fc64b2",
                        "userId": "601d07f259e12e126c0a2af4",
                        "content": "code ngao vl",
                        "createdAt": "2021-02-07T10:27:14.957Z",
                    },
                    {
                        "_id": "601fc0af633e8c3688fc64b3",
                        "userId": "601d07f259e12e126c0a2af4",
                        "content": "code ngao vl hihi",
                        "createdAt": "2021-02-07T10:27:59.483Z",
                    }
    ]
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission get feedbacks"
 *     }
 */
const getFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find({}, { updatedAt: 0, __v: 0 });
        res.status(200).json({
            status: 200,
            msg: "Success",
            feedbacks,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/feedbacks create feedback
 * @apiName create feedback
 * @apiGroup Feedback
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} content content's feedback
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
 *       "msg": "Denny permission create feedback"
 *     }
 */
const createFeedback = async (req, res, next) => {
    const { _id } = req.user;
    const { content } = req.body;
    try {
        await Feedback.create({ userId: _id, content });
        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {delete} /api/v1/feedbacks/[feedbackId] delete feedback
 * @apiName delete feedback
 * @apiGroup Feedback
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
 *       "msg": "Denny permission delete feedback"
 *     }
 */
const deleteFeedback = async (req, res, next) => {
    const { feedbackId } = req.params;
    try {
        const deleted = await Feedback.findByIdAndDelete({ _id: feedbackId });
        if (!deleted) {
            throw new HttpError("Delete Feedback faild", 400);
        }
        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

export const feedbackCotroller = { getFeedbacks, createFeedback, deleteFeedback };
