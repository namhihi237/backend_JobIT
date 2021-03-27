import mongo from "mongoose";
import { ITer, Cv, Company, Account } from "../models";
import { HttpError } from "../utils";

/**
 * @api {get} /api/v1/iters/profile get profile
 * @apiName get profile
 * @apiGroup Iter
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Object} user <code> Objects user</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
          "user": {
                "_id": "6020bd895d7a6b07b0b0eef9",
                "email": "yentth@gmail.com",
                "fullName": "Le Trung Nam",
            }
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission get profile"
 *     }
 */
const getUserProfile = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const user = await ITer.findOne(
            { accountId: _id },
            {
                __v: 0,
                password: 0,
                createdAt: 0,
                updatedAt: 0,
                receiveMailJob: 0,
                role: 0,
                roleId: 0,
            }
        );
        if (!user) throw new HttpError("User not found", 400);
        res.status(200).json({
            status: 200,
            msg: "Success",
            user,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/iters/profile update profile
 * @apiName update profile
 * @apiGroup Iter
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} fullName fullname's company
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
const updateProfile = async (req, res, next) => {
    const { fullName } = req.user;
    const { _id } = req.user;
    try {
        await ITer.findOneAndUpdate({ accountId: _id }, { fullName });
        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {get} /api/v1/iters get all iters
 * @apiName get all iters
 * @apiGroup Iter
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Array} iters
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *         "iters": [
                {
                    "_id": "605a9df9fcedab20d405cc4b",
                    "fullName": "nam le",
                    "accountId": "605a9df9fcedab20d405cc44",
                    "email": "it1@gmail.com",
                    "createdAt": "2021-03-24T02:03:37.303Z"
                },
                {
                    "_id": "605a9f2baff8e42294ee9b36",
                    "fullName": "nam le",
                    "accountId": "605a9f2baff8e42294ee9b2e",
                    "email": "it2@gmail.com",
                    "createdAt": "2021-03-24T02:08:43.797Z"
                }
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
    try {
        const iters = await ITer.find(
            {},
            { __v: 0, updatedAt: 0, receiveMailJob: 0 }
        );
        res.status(200).json({
            status: 200,
            msg: "Success",
            iters,
        });
    } catch (error) {
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
        if (!mongo.Types.ObjectId.isValid(id))
            throw new HttpError("Id incorrect", 401);
        const iter = await ITer.findById({ _id: id });
        console.log(iter);
        if (!iter) throw new HttpError("User not found", 404);
        await Promise.all([
            ITer.findByIdAndDelete({ _id: id }),
            Account.findByIdAndDelete({ _id: iter.accountId }),
        ]);
        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const iterController = {
    getUserProfile,
    updateProfile,
    getIters,
    deleteIter,
};
